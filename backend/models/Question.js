const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  quizId: {
    type: Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  questionType: {
    type: String,
    required: true,
    enum: ["multiple_choice", "single_choice", "true_false", "short_answer", "essay"],
  },
  options: [
    {
      text: String,
      isCorrect: Boolean, // Only relevant for multiple_choice, single_choice
    },
  ],
  correctAnswer: {
    // For true_false: Boolean
    // For short_answer: String (or array of acceptable strings)
    // For essay: null (manual grading or AI feedback)
    type: Schema.Types.Mixed,
  },
  points: {
    type: Number,
    default: 1,
  },
  aiGradingHints: {
    // Hints or keywords for AI grading, especially for short_answer/essay
    type: String,
  },
}, {
  timestamps: true
});

const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;
