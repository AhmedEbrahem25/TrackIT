const express = require("express");
const router = express.Router(); // Not using mergeParams here as it's a top-level router for quiz actions by ID
const { check } = require("express-validator");
const quizController = require("../controllers/quizController");
const authMiddleware = require("../middleware/authMiddleware"); // Placeholder

// Placeholder for isAuthenticated and specific role checks (e.g., isEnrolled, isInstructorOrAdmin)
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

const isEnrolledOrOwner = (req, res, next) => {
    // Actual logic to check if user is enrolled in the course of the quiz or is owner/admin
    next();
}

// @route   GET api/quizzes/:quizId
// @desc    Get a specific quiz by ID (with questions)
// @access  Private (Enrolled users with access to lesson/course, Instructor, Admin)
router.get("/:quizId", isAuthenticated, isEnrolledOrOwner, quizController.getQuizById);

// @route   PUT api/quizzes/:quizId
// @desc    Update a quiz (details, not questions here)
// @access  Private (Instructor, Admin)
router.put(
  "/:quizId",
  isAuthenticated,
  isInstructorOrAdmin,
  [
    check("title", "Quiz title is required").optional().not().isEmpty(),
    check("passingScorePercentage", "Passing score must be between 0 and 100").optional().isFloat({ min: 0, max: 100 }),
  ],
  quizController.updateQuiz
);

// @route   DELETE api/quizzes/:quizId
// @desc    Delete a quiz (and its questions)
// @access  Private (Instructor, Admin)
router.delete("/:quizId", isAuthenticated, isInstructorOrAdmin, quizController.deleteQuiz);

// @route   POST api/quizzes/:quizId/submit
// @desc    Submit answers for a quiz
// @access  Private (Enrolled Learner)
router.post(
  "/:quizId/submit",
  isAuthenticated, // Should also check if learner is enrolled and quiz is active/available
  [
    check("answers", "Answers array is required").isArray(),
    check("answers.*.questionId", "Question ID is required for each answer").not().isEmpty(),
    // `answers.*.answer` validation depends on question type, harder to validate generally here
  ],
  quizController.submitQuizAnswers
);

// @route   GET api/quizzes/:quizId/result/:submissionId
// @desc    Get the result of a specific quiz submission
// @access  Private (User who submitted, Instructor, Admin)
router.get("/:quizId/result/:submissionId", isAuthenticated, quizController.getQuizSubmissionResult);

module.exports = router;
