const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
  lessonId: {
    type: Schema.Types.ObjectId,
    ref: "Lesson", // Can be part of a lesson
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course", // Or a standalone quiz for a course
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  timeLimit: {
    type: Number, // in minutes, 0 for no limit
    default: 0,
  },
  passingScorePercentage: {
    type: Number,
    min: 0,
    max: 100,
  },
  aiGradingEnabled: {
    type: Boolean,
    default: false,
  },
  // To prevent users from taking the same quiz instance multiple times if needed,
  // or to version quizzes, additional logic/fields might be needed.
  // For now, focusing on the basic structure.
}, {
  timestamps: true
});

const Quiz = mongoose.model("Quiz", QuizSchema);
module.exports = Quiz;
