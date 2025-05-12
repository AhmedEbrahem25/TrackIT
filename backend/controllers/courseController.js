const Course = require("../models/Course");
const Module = require("../models/Module");
const Lesson = require("../models/Lesson");
const Enrollment = require("../models/Enrollment");
const Review = require("../models/Review"); // Assuming Review model will be created
const { validationResult } = require("express-validator");

// @route   POST api/courses
// @desc    Create a new course
// @access  Private (Instructor, Admin)
exports.createCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Assuming req.session.userId is the instructor/admin creating the course
  if (!req.session.userId) {
    return res.status(401).json({ msg: "User not authenticated" });
  }
  // Add role check for instructor/admin here later

  const {
    title,
    subtitle,
    description,
    category,
    subCategory,
    level,
    language,
    tags,
    coverImage,
    promoVideo,
    price,
    drmEnabled,
    watermarkingDetails,
  } = req.body;

  try {
    const newCourse = new Course({
      title,
      subtitle,
      description,
      instructorId: req.session.userId, // Link to the logged-in user
      category,
      subCategory,
      level,
      language,
      tags: Array.isArray(tags) ? tags : tags ? tags.split(",").map(tag => tag.trim()) : [],
      coverImage,
      promoVideo,
      price,
      drmEnabled,
      watermarkingDetails,
      isPublished: false, // Courses are not published by default
    });

    const course = await newCourse.save();
    res.status(201).json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   GET api/courses
// @desc    Get all published courses (with pagination)
// @access  Public
exports.getAllPublishedCourses = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  try {
    const courses = await Course.find({ isPublished: true })
      .populate("instructorId", "firstName lastName profileImage") // Populate instructor details
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalCourses = await Course.countDocuments({ isPublished: true });

    res.json({
      courses,
      currentPage: page,
      totalPages: Math.ceil(totalCourses / limit),
      totalCourses,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   GET api/courses/:courseId
// @desc    Get a single course by ID (published or owned by instructor/admin)
// @access  Public (for published), Private (for unpublished if owner/admin)
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId)
      .populate("instructorId", "firstName lastName profileImage bio expertise")
      .populate({
        path: "modules",
        populate: {
          path: "lessons",
          model: "Lesson",
          select: "title lessonType order isFreePreview durationEstimate" // Select fields for lessons
        }
      });

    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    // If course is not published, only owner or admin can view
    if (!course.isPublished) {
      if (!req.session.userId || (course.instructorId._id.toString() !== req.session.userId /* && !isAdminRole(req.session.userRoles) */)) {
        return res.status(403).json({ msg: "Access denied. This course is not published." });
      }
    }

    // For learners, filter out non-free-preview lesson content if not enrolled
    // This logic might be better handled on the client or with more granular lesson fetching

    res.json(course);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Course not found (invalid ID format)" });
    }
    res.status(500).send("Server Error");
  }
};

// @route   PUT api/courses/:courseId
// @desc    Update a course
// @access  Private (Instructor owner, Admin)
exports.updateCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!req.session.userId) {
    return res.status(401).json({ msg: "User not authenticated" });
  }

  const {
    title,
    subtitle,
    description,
    category,
    subCategory,
    level,
    language,
    tags,
    coverImage,
    promoVideo,
    price,
    isPublished,
    drmEnabled,
    watermarkingDetails,
  } = req.body;

  const courseFields = {};
  if (title !== undefined) courseFields.title = title;
  if (subtitle !== undefined) courseFields.subtitle = subtitle;
  if (description !== undefined) courseFields.description = description;
  if (category !== undefined) courseFields.category = category;
  if (subCategory !== undefined) courseFields.subCategory = subCategory;
  if (level !== undefined) courseFields.level = level;
  if (language !== undefined) courseFields.language = language;
  if (tags !== undefined) courseFields.tags = Array.isArray(tags) ? tags : tags ? tags.split(",").map(tag => tag.trim()) : [];
  if (coverImage !== undefined) courseFields.coverImage = coverImage;
  if (promoVideo !== undefined) courseFields.promoVideo = promoVideo;
  if (price !== undefined) courseFields.price = price;
  if (isPublished !== undefined) courseFields.isPublished = isPublished;
  if (drmEnabled !== undefined) courseFields.drmEnabled = drmEnabled;
  if (watermarkingDetails !== undefined) courseFields.watermarkingDetails = watermarkingDetails;

  try {
    let course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    // Authorization: Check if logged-in user is the instructor or an admin
    if (course.instructorId.toString() !== req.session.userId /* && !isAdminRole(req.session.userRoles) */) {
      return res.status(403).json({ msg: "User not authorized to update this course" });
    }

    // Increment version if significant fields change (logic can be more complex)
    if (title || description || price) {
        courseFields.version = (course.version || 1) + 1;
    }

    course = await Course.findByIdAndUpdate(
      req.params.courseId,
      { $set: courseFields },
      { new: true, runValidators: true }
    );

    res.json(course);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Course not found (invalid ID format)" });
    }
    res.status(500).send("Server Error");
  }
};

// @route   DELETE api/courses/:courseId
// @desc    Delete a course
// @access  Private (Instructor owner, Admin)
exports.deleteCourse = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "User not authenticated" });
  }

  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    // Authorization: Check if logged-in user is the instructor or an admin
    if (course.instructorId.toString() !== req.session.userId /* && !isAdminRole(req.session.userRoles) */) {
      return res.status(403).json({ msg: "User not authorized to delete this course" });
    }

    // Consider what happens to enrollments, modules, lessons, reviews etc.
    // Soft delete might be preferable: course.isActive = false; await course.save();
    // For now, performing a hard delete for simplicity.
    // await Module.deleteMany({ courseId: req.params.courseId });
    // await Lesson.deleteMany({ courseId: req.params.courseId });
    // await Enrollment.deleteMany({ courseId: req.params.courseId });
    // await Review.deleteMany({ courseId: req.params.courseId });

    await Course.findByIdAndDelete(req.params.courseId);

    res.json({ msg: "Course removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Course not found (invalid ID format)" });
    }
    res.status(500).send("Server Error");
  }
};

// --- Enrollment Routes (could be in a separate enrollmentController) ---

// @route   POST api/courses/:courseId/enroll
// @desc    Enroll current user in a course
// @access  Private (Learner)
exports.enrollInCourse = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "User not authenticated" });
  }

  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    if (!course.isPublished) {
        return res.status(403).json({ msg: "Cannot enroll in an unpublished course." });
    }

    // Check if already enrolled
    let enrollment = await Enrollment.findOne({ userId: req.session.userId, courseId: req.params.courseId });
    if (enrollment) {
      return res.status(400).json({ msg: "User already enrolled in this course" });
    }

    // Handle payment for paid courses - This is a simplified version.
    // In a real app, integrate with payment gateway (Stripe, PayPal) here or before this step.
    // For now, assuming free courses or payment handled elsewhere.
    let transactionId = null;
    if (course.price > 0) {
      // TODO: Implement payment logic and create a Transaction record
      // For now, simulate a successful payment for a paid course for testing purposes
      // This is NOT production-ready payment handling.
      console.log(`Simulating payment for course ${course.title} by user ${req.session.userId}`);
      // transactionId = new mongoose.Types.ObjectId(); // Placeholder
    }

    enrollment = new Enrollment({
      userId: req.session.userId,
      courseId: req.params.courseId,
      // transactionId: transactionId, // if payment was processed
    });

    await enrollment.save();

    // Optionally, update course's totalEnrollments count
    course.totalEnrollments = (course.totalEnrollments || 0) + 1;
    await course.save();

    res.status(201).json(enrollment);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Course not found (invalid ID format)" });
    }
    res.status(500).send("Server Error");
  }
};

// @route   GET api/courses/enrolled/me
// @desc    Get courses enrolled by the current user
// @access  Private (Learner)
exports.getMyEnrolledCourses = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "User not authenticated" });
  }
  try {
    const enrollments = await Enrollment.find({ userId: req.session.userId })
      .populate({
          path: "courseId",
          model: "Course",
          populate: { path: "instructorId", model: "User", select: "firstName lastName" }
      })
      .sort({ enrolledAt: -1 });

    res.json(enrollments.map(e => e.courseId)); // Return the course objects
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// --- Review Routes (could be in a separate reviewController) ---

// @route   POST api/courses/:courseId/reviews
// @desc    Create a review for a course
// @access  Private (Enrolled Learner)
exports.createCourseReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!req.session.userId) {
    return res.status(401).json({ msg: "User not authenticated" });
  }

  const { rating, comment } = req.body;

  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    // Check if user is enrolled in the course
    const enrollment = await Enrollment.findOne({ userId: req.session.userId, courseId: req.params.courseId });
    if (!enrollment) {
      return res.status(403).json({ msg: "User must be enrolled to review this course" });
    }

    // Check if user already reviewed this course
    let review = await Review.findOne({ userId: req.session.userId, courseId: req.params.courseId });
    if (review) {
      // Update existing review
      review.rating = rating;
      review.comment = comment;
    } else {
      // Create new review
      review = new Review({
        userId: req.session.userId,
        courseId: req.params.courseId,
        rating,
        comment,
      });
    }
    await review.save();

    // Update course average rating (this can be complex, consider a scheduled job or more robust calculation)
    const reviews = await Review.find({ courseId: req.params.courseId });
    course.averageRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    await course.save();

    res.status(201).json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   GET api/courses/:courseId/reviews
// @desc    Get all reviews for a course
// @access  Public
exports.getCourseReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ courseId: req.params.courseId })
      .populate("userId", "firstName lastName profileImage")
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
// courseController.js - Connect course components
exports.enrollCourse = async (req, res) => {
    try {
      const user = await User.findById(req.session.userId);
      const course = await Course.findById(req.params.courseId);
  
      if (!user || !course) return res.status(404).json({ msg: 'Not found' });
  
      const enrollment = {
        course: course._id,
        enrolledAt: Date.now(),
        progress: 0
      };
  
      user.enrolledCourses.push(enrollment);
      await user.save();
  
      res.json(user.enrolledCourses);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

