const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const userController = require("../controllers/userController");
//const authMiddleware = require("../middleware/authMiddleware"); // Assuming this will be created for isAuthenticated

// Middleware to simulate isAuthenticated for now (replace with actual session check)
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  res.status(401).json({ msg: "Not authorized, please log in." });
};

// @route   GET api/users/me
// @desc    Get current user profile
// @access  Private
router.get("/me", isAuthenticated, userController.getMyProfile);

// @route   PUT api/users/me
// @desc    Update current user profile
// @access  Private
router.put(
  "/me",
  isAuthenticated,
  [
    // Add validation checks as needed, e.g.:
    check("email", "Please include a valid email").optional().isEmail(),
    check("firstName", "First name should be a string").optional().isString(),
    check("lastName", "Last name should be a string").optional().isString(),
    // Add more checks for other fields based on User.js schema and requirements
  ],
  userController.updateMyProfile
);

// @route   GET api/users/:userId/profile
// @desc    Get user profile by ID (public view)
// @access  Public (or implement role-based access if needed)
router.get("/:userId/profile", userController.getUserProfileById);

// Admin routes - to be protected by an admin role check middleware
// router.get("/admin/all", isAuthenticated, isAdmin, userController.adminGetAllUsers);
// router.get("/admin/:userId", isAuthenticated, isAdmin, userController.adminGetUserById);
// router.put("/admin/:userId", isAuthenticated, isAdmin, userController.adminUpdateUser);
// router.delete("/admin/:userId", isAuthenticated, isAdmin, userController.adminDeleteUser);

module.exports = router;
