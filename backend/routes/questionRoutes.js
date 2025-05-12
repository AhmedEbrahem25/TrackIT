const express = require("express");
const router = express.Router({ mergeParams: true }); // mergeParams allows access to :quizId
const { check } = require("express-validator");
const questionController = require("../controllers/questionController");
const authMiddleware = require("../middleware/authMiddleware"); // Placeholder

// Placeholder for isAuthenticated and isInstructorOrAdmin middleware
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  res.status(401).json({ msg: "Not authorized, please log in." });
};

const isInstructorOrAdmin = (req, res, next) => {
  // Actual role check logic here
  next();
};

// @route   POST api/quizzes/:quizId/questions
// @desc    Add a new question to a quiz
// @access  Private (Instructor, Admin)
router.post(
  "/",
  isAuthenticated,
  isInstructorOrAdmin,
  [
    check("text", "Question text is required").not().isEmpty(),
    check("questionType", "Question type is required").isIn(["multiple_choice", "single_choice", "true_false", "short_answer", "essay"]),
    // Add more specific validation for options/correctAnswer based on questionType if needed
  ],
  questionController.addQuestionToQuiz
);

// @route   GET api/quizzes/:quizId/questions/:questionId
// @desc    Get a specific question from a quiz
// @access  Private (Instructor, Admin - or enrolled users during quiz)
router.get("/:questionId", isAuthenticated, questionController.getQuestionById);

// @route   PUT api/quizzes/:quizId/questions/:questionId
// @desc    Update a question in a quiz
// @access  Private (Instructor, Admin)
router.put(
  "/:questionId",
  isAuthenticated,
  isInstructorOrAdmin,
  [
    check("text", "Question text is required").optional().not().isEmpty(),
    check("questionType", "Question type is required").optional().isIn(["multiple_choice", "single_choice", "true_false", "short_answer", "essay"]),
  ],
  questionController.updateQuestion
);

// @route   DELETE api/quizzes/:quizId/questions/:questionId
// @desc    Delete a question from a quiz
// @access  Private (Instructor, Admin)
router.delete(
  "/:questionId",
  isAuthenticated,
  isInstructorOrAdmin,
  questionController.deleteQuestion
);

module.exports = router;
