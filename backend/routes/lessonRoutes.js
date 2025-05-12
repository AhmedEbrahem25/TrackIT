const express = require("express");
const router = express.Router({ mergeParams: true }); // mergeParams allows access to :courseId and :moduleId
const { check } = require("express-validator");
const lessonController = require("../controllers/lessonController");
const authMiddleware = require("../middleware/authMiddleware"); // Placeholder

// Placeholder for isAuthenticated and isInstructorOrAdmin middleware
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  res.status(401).json({ msg: "Not authorized, please log in." });
};

// Placeholder for role check
const isInstructorOrAdmin = (req, res, next) => {
  // Logic to check if req.session.user.roles includes 'instructor' or 'admin'
  // And if instructor, they own the course
  next(); // For now, allow all authenticated users for simplicity
};

// @route   POST api/courses/:courseId/modules/:moduleId/lessons
// @desc    Create a new lesson for a module
// @access  Private (Instructor of the course, Admin)
router.post(
  "/",
  isAuthenticated,
  isInstructorOrAdmin,
  [
    check("title", "Lesson title is required").not().isEmpty(),
    check("lessonType", "Lesson type is required").isIn(["video", "text", "quiz", "coding_lab", "scorm", "live_webinar"]),
    check("order", "Lesson order must be a number").isNumeric(),
    // Add more specific validation for 'content' based on 'lessonType' if possible
  ],
  lessonController.createLesson
);

// @route   GET api/courses/:courseId/modules/:moduleId/lessons
// @desc    Get all lessons for a specific module
// @access  Private (Enrolled users, Instructor, Admin)
router.get("/", isAuthenticated, lessonController.getLessonsForModule);

// @route   GET api/courses/:courseId/modules/:moduleId/lessons/:lessonId
// @desc    Get a specific lesson by ID
// @access  Private (Enrolled users, Instructor, Admin)
router.get("/:lessonId", isAuthenticated, lessonController.getLessonById);

// @route   PUT api/courses/:courseId/modules/:moduleId/lessons/:lessonId
// @desc    Update a lesson
// @access  Private (Instructor of the course, Admin)
router.put(
  "/:lessonId",
  isAuthenticated,
  isInstructorOrAdmin,
  [
    check("title", "Lesson title is required").optional().not().isEmpty(),
    check("lessonType", "Lesson type is required").optional().isIn(["video", "text", "quiz", "coding_lab", "scorm", "live_webinar"]),
    check("order", "Lesson order must be a number").optional().isNumeric(),
  ],
  lessonController.updateLesson
);

// @route   DELETE api/courses/:courseId/modules/:moduleId/lessons/:lessonId
// @desc    Delete a lesson
// @access  Private (Instructor of the course, Admin)
router.delete(
  "/:lessonId",
  isAuthenticated,
  isInstructorOrAdmin,
  lessonController.deleteLesson
);

module.exports = router;
