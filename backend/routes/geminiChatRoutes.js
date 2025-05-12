const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();



// Initialize Gemini AI Client
let genAI;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
} else {
  console.error("GEMINI_API_KEY not found in .env file. Gemini AI functionality will be disabled.");
}

// Making sure we log any AI errors in detail for debugging
const handleAIError = (error) => {
  console.error("Detailed Gemini AI error:", error);
  
  // Check for specific error conditions
  if (error.message && error.message.includes("API key not valid")) {
    return { 
      status: 401, 
      msg: "Gemini API key is invalid. Please check your configuration." 
    };
  }
  
  // Check for quota exceeded
  if (error.message && error.message.includes("quota")) {
    return {
      status: 429,
      msg: "API quota exceeded. Please try again later."
    };
  }
  
  // Add better input validation at the start of the route:
if (!prompt || typeof prompt !== 'string') {
  return res.status(400).json({ 
    msg: "Prompt is required and must be a string",
    code: "INVALID_PROMPT"
  });
}

if (history && !Array.isArray(history)) {
  return res.status(400).json({
    msg: "History must be an array if provided",
    code: "INVALID_HISTORY"
  });
}
  // Default error
  return {
    status: 500,
    msg: "Error generating text with Gemini AI",
    error: error.message
  };
};

// @route   POST api/gemini-chat
// @desc    Chat with Gemini AI and maintain conversation history
// @access  Public (can be made private with auth middleware)
router.post("/api/gemini-chat", async (req, res) => {
  if (!genAI) {
    return res.status(500).json({ msg: "Gemini AI is not configured due to missing API key." });
  }

  const { prompt, history } = req.body;

  if (!prompt) {
    return res.status(400).json({ msg: "Prompt is required" });
  }

  try {
    // For debugging purposes
    console.log("Received chat request with prompt:", prompt);
    console.log("History length:", history ? history.length : 0);

    // Initialize the chat model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Format history for Gemini API
    // Only include actual message content without loading states
    const formattedHistory = history ? history
      .filter(msg => !msg.isLoading)
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      })) : [];
    
    // Start a chat session
    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
      }
    });

    // Send the message and get a response
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("Successfully generated response from Gemini");
    res.json({ generatedText: text });
  } catch (error) {
    const errorResponse = handleAIError(error);
    res.status(errorResponse.status).json(errorResponse);
  }
});

module.exports = router;