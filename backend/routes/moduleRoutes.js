const express = require("express");
const router = express.Router({ mergeParams: true }); // mergeParams allows access to :courseId
const { check } = require("express-validator");
const moduleController = require("../controllers/moduleController");
const authMiddleware = require("../middleware/authMiddleware"); // Placeholder

// Placeholder for isAuthenticated and isInstructorOrAdmin middleware
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  res.status(401).json({ msg: "Not authorized, please log in." });
};

// Placeholder for role check - this needs to be implemented properly
const isInstructorOrAdmin = (req, res, next) => {
  // Logic to check if req.session.user.roles includes 'instructor' or 'admin'
  // And if instructor, they own the course
  next(); // For now, allow all authenticated users for simplicity
};

// @route   POST api/courses/:courseId/modules
// @desc    Create a new module for a course
// @access  Private (Instructor of the course, Admin)
router.post(
  "/",
  isAuthenticated, // General authentication
  isInstructorOrAdmin, // Specific role/ownership check
  [
    check("title", "Module title is required").not().isEmpty(),
    check("order", "Module order must be a number").isNumeric(),
  ],
  moduleController.createModule
);

// @route   GET api/courses/:courseId/modules
// @desc    Get all modules for a specific course
// @access  Private (Enrolled users, Instructor of the course, Admin)
router.get("/", isAuthenticated, moduleController.getModulesForCourse);

// @route   GET api/courses/:courseId/modules/:moduleId
// @desc    Get a specific module by ID
// @access  Private (Enrolled users, Instructor of the course, Admin)
router.get("/:moduleId", isAuthenticated, moduleController.getModuleById);

// @route   PUT api/courses/:courseId/modules/:moduleId
// @desc    Update a module
// @access  Private (Instructor of the course, Admin)
router.put(
  "/:moduleId",
  isAuthenticated,
  isInstructorOrAdmin,
  [
    check("title", "Module title is required").optional().not().isEmpty(),
    check("order", "Module order must be a number").optional().isNumeric(),
  ],
  moduleController.updateModule
);

// @route   DELETE api/courses/:courseId/modules/:moduleId
// @desc    Delete a module
// @access  Private (Instructor of the course, Admin)
router.delete(
  "/:moduleId",
  isAuthenticated,
  isInstructorOrAdmin,
  moduleController.deleteModule
);

module.exports = router;
