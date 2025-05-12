const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
  moduleId: {
    type: Schema.Types.ObjectId,
    ref: "Module",
    required: true,
  },
  courseId: { // Denormalized for easier querying, though moduleId implies courseId
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  lessonType: {
    type: String,
    required: true,
    enum: ["video", "text", "quiz", "coding_lab", "scorm", "live_webinar"],
  },
  content: {
    // Flexible content based on lessonType
    // For "video": { videoUrl: String, provider: String (e.g., youtube, vimeo, self_hosted), duration: Number }
    // For "text": { textContent: String }
    // For "quiz": { quizId: { type: Schema.Types.ObjectId, ref: "Quiz" } }
    // For "coding_lab": { labInstructions: String, environmentSetup: String, solutionUrl: String }
    // For "scorm": { scormPackageUrl: String }
    // For "live_webinar": { webinarLink: String, startTime: Date, endTime: Date }
    type: Schema.Types.Mixed,
  },
  durationEstimate: {
    type: Number, // in minutes
  },
  order: {
    type: Number, // For sequencing within a module
    required: true,
  },
  isFreePreview: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true
});

const Lesson = mongoose.model("Lesson", LessonSchema);
module.exports = Lesson;
