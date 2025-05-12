const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for Course
const CourseSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true
  },
  // Add other course-related fields as needed
  // e.g., modules, lessons, enrollment, etc.
  modules: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Module'
    }
  ],
  enrollments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Enrollment'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Define a pre-save hook to update the `updatedAt` field
CourseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;

