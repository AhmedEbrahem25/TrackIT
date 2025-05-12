const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EnrollmentSchema = new Schema({
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
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
  progress: {
    type: Number,
    default: 0, // Percentage or number of lessons completed
    min: 0,
    max: 100, // Assuming progress is a percentage
  },
  completedAt: {
    type: Date, // To mark when the course was completed
    default: null,
  },
  // Optional: If you plan to integrate payments and track transactions
  // transactionId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Transaction", // Assuming a Transaction model
  // },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Index to efficiently query enrollments by user and course
EnrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model("Enrollment", EnrollmentSchema);

