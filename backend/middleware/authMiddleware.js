const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Assuming User model is in ../models/User.js

const authMiddleware = async (req, res, next) => {
  let token;

  // Check for token in Authorization header (Bearer token)
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key"); // Use environment variable for secret

      // Get user from the token and attach to request object
      // Exclude password from being attached to req.user
      req.user = await User.findById(decoded.id).select("-password"); 

      if (!req.user) {
        return res.status(401).json({ msg: "Not authorized, user not found" });
      }

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error("Token verification failed:", error.message);
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ msg: "Not authorized, token failed (invalid signature)" });
      }
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ msg: "Not authorized, token expired" });
      }
      return res.status(401).json({ msg: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ msg: "Not authorized, no token provided" });
  }
};

// Optional: Middleware to check for specific roles (e.g., admin, instructor)
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.roles || !roles.some(role => req.user.roles.includes(role))) {
      return res.status(403).json({ msg: `User role ${req.user ? req.user.roles.join(", ") : "unknown"} is not authorized to access this route. Required roles: ${roles.join(", ")}` });
    }
    next();
  };
};

module.exports = { authMiddleware, authorizeRoles };

