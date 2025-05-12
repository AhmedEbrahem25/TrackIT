const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserAnswerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quizId: {
    type: Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  lessonId: { // Optional, if the quiz is part of a lesson
    type: Schema.Types.ObjectId,
    ref: "Lesson",
  },
  courseId: { // Optional, for context
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  answers: [
    {
      questionId: {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
      answer: Schema.Types.Mixed, // Stores the user's actual answer
    },
  ],
  score: {
    type: Number,
  },
  isPassed: {
    type: Boolean,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  gradedAt: {
    type: Date,
  },
  aiFeedback: {
    type: String, // Feedback from AI grading, if applicable
  },
}, {
  timestamps: true
});

const UserAnswer = mongoose.model("UserAnswer", UserAnswerSchema);
module.exports = UserAnswer;
