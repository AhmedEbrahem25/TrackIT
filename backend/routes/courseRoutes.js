const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const { body } = require("express-validator"); // For validation, if needed in routes

// Placeholder for authentication and authorization middleware
// const authMiddleware = (req, res, next) => { /* ... */ next(); };
// const instructorOrAdminMiddleware = (req, res, next) => { /* ... */ next(); };

// @route   POST /api/courses
// @desc    Create a new course
// @access  Private (Instructor, Admin)
router.post(
  "/",
  // authMiddleware, // Example: Protect route
  // instructorOrAdminMiddleware, // Example: Role-based access
  [
    // Basic validations (can be expanded based on Course model)
    body("title", "Title is required").not().isEmpty(),
    body("description", "Description is required").not().isEmpty(),
    body("category", "Category is required").not().isEmpty(),
    body("price", "Price must be a non-negative number").optional().isFloat({ gte: 0 }),
  ],
  courseController.createCourse
);

// @route   GET /api/courses
// @desc    Get all published courses (with pagination)
// @access  Public
router.get("/", courseController.getAllPublishedCourses);

// @route   GET /api/courses/enrolled/me
// @desc    Get courses enrolled by the current user
// @access  Private (Learner)
router.get(
    "/enrolled/me", 
    // authMiddleware, // Example: Protect route
    courseController.getMyEnrolledCourses
);

// @route   GET /api/courses/:courseId
// @desc    Get a single course by ID
// @access  Public (for published), Private (for unpublished if owner/admin)
router.get("/:courseId", courseController.getCourseById);

// @route   PUT /api/courses/:courseId
// @desc    Update a course
// @access  Private (Instructor owner, Admin)
router.put(
  "/:courseId",
  // authMiddleware,
  // instructorOrAdminMiddleware,
  [
    // Optional: Add validation for update fields if necessary
    body("title").optional().not().isEmpty(),
    body("price").optional().isFloat({ gte: 0 }),
  ],
  courseController.updateCourse
);

// @route   DELETE /api/courses/:courseId
// @desc    Delete a course
// @access  Private (Instructor owner, Admin)
router.delete(
  "/:courseId",
  // authMiddleware,
  // instructorOrAdminMiddleware,
  courseController.deleteCourse
);

// --- Enrollment Routes ---
// @route   POST /api/courses/:courseId/enroll
// @desc    Enroll current user in a course
// @access  Private (Learner)
router.post(
  "/:courseId/enroll",
  // authMiddleware, // Example: Protect route
  courseController.enrollInCourse
);


// --- Review Routes ---
// @route   POST /api/courses/:courseId/reviews
// @desc    Create or update a review for a course
// @access  Private (Enrolled Learner)
router.post(
  "/:courseId/reviews",
  // authMiddleware, // Example: Protect route
  [
    body("rating", "Rating is required and must be between 1 and 5").isInt({ min: 1, max: 5 }),
    body("comment").optional().isString(),
  ],
  courseController.createCourseReview
);

// @route   GET /api/courses/:courseId/reviews
// @desc    Get all reviews for a course
// @access  Public
router.get("/:courseId/reviews", courseController.getCourseReviews);

module.exports = router;

