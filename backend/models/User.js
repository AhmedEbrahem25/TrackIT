const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Added bcrypt import
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  bio: { type: String },
  location: { type: String },
  profileImage: { type: String },
  skills: [{ type: String }],
  experience: [
    {
      title: String,
      company: String,
      location: String,
      startDate: Date,
      endDate: Date,
      description: String,
      current: Boolean
    },
  ],
  education: [
    {
      school: String,
      degree: String,
      fieldOfStudy: String,
      startDate: Date,
      endDate: Date,
      description: String,
      current: Boolean
    },
  ],
  roles: [{ type: String, default: ["user"] }],
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, { timestamps: true });

// Password hashing middleware
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
// In models/User.js
UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    console.error('Password comparison error:', err);
    throw err;
  }
};

// Generate JWT token
UserSchema.methods.generateJWT = function() {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      roles: this.roles
    },
    process.env.JWT_SECRET || "your-secret-key",
    { expiresIn: "5h" }
  );
};

// Format user data for authentication responses
UserSchema.methods.toAuthJSON = function() {
  return {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    roles: this.roles,
    profileImage: this.profileImage
  };
};

// Format public profile data
UserSchema.methods.toProfileJSON = function() {
  return {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    bio: this.bio,
    location: this.location,
    profileImage: this.profileImage,
    skills: this.skills,
    experience: this.experience,
    education: this.education,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

module.exports = mongoose.model("User", UserSchema);