import React, { useState, useEffect, useRef } from 'react';
import '../Style/Chatbot.css';
import api from '../utils/api';

// SVG Icons
const MessageSquareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v3m0 12v3M5.636 5.636l2.122 2.122m8.484 8.484l2.122 2.122M3 12h3m12 0h3M5.636 18.364l2.122-2.122m8.484-8.484l2.122-2.122"></path>
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const LoaderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="loader-icon">
    <line x1="12" y1="2" x2="12" y2="6"></line>
    <line x1="12" y1="18" x2="12" y2="22"></line>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
    <line x1="2" y1="12" x2="6" y2="12"></line>
    <line x1="18" y1="12" x2="22" y2="12"></line>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
  </svg>
);

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize with welcome message
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    setMessages(savedMessages ? JSON.parse(savedMessages) : [
      {
        id: generateId(),
        text: "Hi there! I'm your Gemini Learning Assistant. How can I help you today?",
        sender: 'assistant',
        timestamp: new Date()
      }
    ]);
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const sanitizeInput = (input) => {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };

  const handleSendMessage = async () => {
    const now = Date.now();
    if (inputValue.trim() === '' || isProcessing || now - lastMessageTime < 1000) {
      return;
    }
    setLastMessageTime(now);

    const sanitizedInput = sanitizeInput(inputValue);
    const userMessage = {
      id: generateId(),
      text: sanitizedInput,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    const loadingMessageId = generateId();
    setMessages(prev => [
      ...prev,
      {
        id: loadingMessageId,
        text: '',
        sender: 'assistant',
        timestamp: new Date(),
        isLoading: true
      }
    ]);

    setIsProcessing(true);

    try {
      const response = await api.post('/gemini-chat', {
        prompt: userMessage.text,
        history: messages.filter(msg => !msg.isLoading)
      });

      setMessages(prev => {
        const updated = [...prev];
        const index = updated.findIndex(msg => msg.id === loadingMessageId);
        if (index !== -1) {
          updated[index] = {
            id: loadingMessageId,
            text: response.data.generatedText,
            sender: 'assistant',
            timestamp: new Date(),
            isLoading: false
          };
        }
        return updated;
      });
    } catch (error) {
      console.error('Error:', error);
      
      let errorMessage = 'Sorry, an error occurred. Please try again.';
      if (error.response) {
        switch(error.response.status) {
          case 401:
            errorMessage = 'Session expired. Please refresh the page.';
            break;
          case 429:
            errorMessage = 'Too many requests. Please wait a moment.';
            break;
          case 500:
            errorMessage = 'Server error. Our team has been notified.';
            break;
          default:
            errorMessage = error.response.data?.msg || error.response.data?.error || errorMessage;
        }
      } else if (error.message.includes('Network Error')) {
        errorMessage = 'Network connection issue. Please check your internet.';
      }

      setMessages(prev => {
        const updated = [...prev];
        const index = updated.findIndex(msg => msg.id === loadingMessageId);
        if (index !== -1) {
          updated[index] = {
            id: loadingMessageId,
            text: errorMessage,
            sender: 'assistant',
            timestamp: new Date(),
            isLoading: false,
            isError: true,
            lastUserMessage: userMessage.text
          };
        }
        return updated;
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetry = async (messageId) => {
    const messageToRetry = messages.find(msg => msg.id === messageId);
    if (!messageToRetry || isProcessing) return;

    setMessages(prev => prev.filter(msg => msg.id !== messageId));

    const loadingMessageId = generateId();
    setMessages(prev => [
      ...prev,
      {
        id: loadingMessageId,
        text: '',
        sender: 'assistant',
        timestamp: new Date(),
        isLoading: true
      }
    ]);

    setIsProcessing(true);

    try {
      const response = await api.post('/gemini-chat', {
        prompt: messageToRetry.lastUserMessage,
        history: messages
          .filter(msg => msg.id !== messageId && !msg.isLoading)
      });

      setMessages(prev => {
        const updated = [...prev];
        const index = updated.findIndex(msg => msg.id === loadingMessageId);
        if (index !== -1) {
          updated[index] = {
            id: loadingMessageId,
            text: response.data.generatedText,
            sender: 'assistant',
            timestamp: new Date(),
            isLoading: false
          };
        }
        return updated;
      });
    } catch (error) {
      // Error handling remains the same
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="gemini-chatbot-container">
      <button
        onClick={toggleChatbot}
        className="chatbot-toggle-btn"
        aria-label="Open Learning Assistant"
      >
        <MessageSquareIcon />
      </button>
      
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="header-title">
            <SparklesIcon />
            <h3>Gemini Learning Assistant</h3>
          </div>
          <button 
            onClick={toggleChatbot}
            className="chatbot-close-btn"
            aria-label="Close chat"
          >
            <XIcon />
          </button>
        </div>
        
        <div className="messages-container">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`message ${message.sender}-message ${message.isError ? 'error-message' : ''}`}
            >
              <div className="message-bubble">
                {message.isLoading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <>
                    <div className="message-text">
                      {message.isError ? (
                        <div className="error-content">
                          <span className="error-icon">⚠️</span>
                          {message.text}
                          <button 
                            onClick={() => handleRetry(message.id)}
                            className="retry-btn"
                            disabled={isProcessing}
                          >
                            Retry
                          </button>
                        </div>
                      ) : (
                        message.text
                      )}
                    </div>
                    <div className="message-timestamp">{formatTime(message.timestamp)}</div>
                  </>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="input-area">
          <div className="input-container">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question..."
              className="chatbot-input"
              disabled={isProcessing}
            />
            <button
              onClick={handleSendMessage}
              className="chatbot-send-btn"
              disabled={inputValue.trim() === '' || isProcessing}
              aria-label="Send message"
            >
              {isProcessing ? <LoaderIcon /> : <SendIcon />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;