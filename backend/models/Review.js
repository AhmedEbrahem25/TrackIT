const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1, // Assuming a 1-5 star rating system
    max: 5,
  },
  comment: {
    type: String,
    trim: true,
  },
  // Timestamps will add createdAt and updatedAt automatically
}, { timestamps: true });

// Index to efficiently query reviews by course or by user
ReviewSchema.index({ courseId: 1 });
ReviewSchema.index({ userId: 1 });
// Optional: Composite index if you often query by both user and course for a review
// ReviewSchema.index({ userId: 1, courseId: 1 }, { unique: true }); // A user can only review a course once

module.exports = mongoose.model("Review", ReviewSchema);

