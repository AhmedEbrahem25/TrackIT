const Lesson = require("../models/Lesson");
const Module = require("../models/Module");
const Course = require("../models/Course"); // For authorization checks
const { validationResult } = require("express-validator");

// @route   POST api/courses/:courseId/modules/:moduleId/lessons
// @desc    Create a new lesson for a module
// @access  Private (Instructor of the course, Admin)
exports.createLesson = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!req.session.userId) {
    return res.status(401).json({ msg: "User not authenticated" });
  }

  const { title, lessonType, content, durationEstimate, order, isFreePreview } = req.body;
  const { courseId, moduleId } = req.params;

  try {
    const module = await Module.findOne({ _id: moduleId, courseId });
    if (!module) {
      return res.status(404).json({ msg: "Module not found in this course" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
        return res.status(404).json({ msg: "Course not found" });
    }

    // Authorization: Check if logged-in user is the instructor of this course or an admin
    if (course.instructorId.toString() !== req.session.userId /* && !isAdminRole(req.session.userRoles) */) {
      return res.status(403).json({ msg: "User not authorized to add lessons to this module" });
    }

    const newLesson = new Lesson({
      moduleId,
      courseId, // Denormalized for easier access
      title,
      lessonType,
      content, // Content structure depends on lessonType, ensure validation if possible
      durationEstimate,
      order,
      isFreePreview,
    });

    const lesson = await newLesson.save();

    // Add lesson reference to the module
    module.lessons.push(lesson._id);
    await module.save();

    res.status(201).json(lesson);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'CastError') {
        return res.status(400).json({ msg: 'Invalid ID format for course or module' });
    }
    res.status(500).send("Server Error");
  }
};

// @route   GET api/courses/:courseId/modules/:moduleId/lessons
// @desc    Get all lessons for a specific module
// @access  Private (Enrolled users, Instructor, Admin)
exports.getLessonsForModule = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "User not authenticated" });
  }
  const { courseId, moduleId } = req.params;

  try {
    const module = await Module.findOne({ _id: moduleId, courseId });
    if (!module) {
      return res.status(404).json({ msg: "Module not found in this course" });
    }

    // Authorization: Check if user is enrolled, or is instructor/admin
    // Similar to module access logic

    const lessons = await Lesson.find({ moduleId }).sort({ order: 1 });
    res.json(lessons);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'CastError') {
        return res.status(400).json({ msg: 'Invalid ID format for course or module' });
    }
    res.status(500).send("Server Error");
  }
};

// @route   GET api/courses/:courseId/modules/:moduleId/lessons/:lessonId
// @desc    Get a specific lesson by ID
// @access  Private (Enrolled users, Instructor, Admin)
exports.getLessonById = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "User not authenticated" });
  }
  const { courseId, moduleId, lessonId } = req.params;

  try {
    const lesson = await Lesson.findOne({ _id: lessonId, moduleId, courseId });

    if (!lesson) {
      return res.status(404).json({ msg: "Lesson not found" });
    }

    // Authorization check
    // If lesson is not free preview, check enrollment or ownership
    // if (!lesson.isFreePreview) {
    //   const enrollment = await Enrollment.findOne({ userId: req.session.userId, courseId });
    //   const course = await Course.findById(courseId);
    //   if (!enrollment && course.instructorId.toString() !== req.session.userId /* && !isAdmin */) {
    //     return res.status(403).json({ msg: "Access denied. Enroll in course to view this lesson." });
    //   }
    // }

    res.json(lesson);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'CastError') {
        return res.status(400).json({ msg: 'Invalid ID format' });
    }
    res.status(500).send("Server Error");
  }
};

// @route   PUT api/courses/:courseId/modules/:moduleId/lessons/:lessonId
// @desc    Update a lesson
// @access  Private (Instructor of the course, Admin)
exports.updateLesson = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!req.session.userId) {
    return res.status(401).json({ msg: "User not authenticated" });
  }

  const { title, lessonType, content, durationEstimate, order, isFreePreview } = req.body;
  const { courseId, moduleId, lessonId } = req.params;

  const lessonFields = {};
  if (title !== undefined) lessonFields.title = title;
  if (lessonType !== undefined) lessonFields.lessonType = lessonType;
  if (content !== undefined) lessonFields.content = content;
  if (durationEstimate !== undefined) lessonFields.durationEstimate = durationEstimate;
  if (order !== undefined) lessonFields.order = order;
  if (isFreePreview !== undefined) lessonFields.isFreePreview = isFreePreview;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    // Authorization: Check if logged-in user is the instructor of this course or an admin
    if (course.instructorId.toString() !== req.session.userId /* && !isAdminRole(req.session.userRoles) */) {
      return res.status(403).json({ msg: "User not authorized to update lessons in this module" });
    }

    let lesson = await Lesson.findOne({ _id: lessonId, moduleId, courseId });
    if (!lesson) {
      return res.status(404).json({ msg: "Lesson not found in this module" });
    }

    lesson = await Lesson.findByIdAndUpdate(
      lessonId,
      { $set: lessonFields },
      { new: true, runValidators: true }
    );

    res.json(lesson);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'CastError') {
        return res.status(400).json({ msg: 'Invalid ID format' });
    }
    res.status(500).send("Server Error");
  }
};

// @route   DELETE api/courses/:courseId/modules/:moduleId/lessons/:lessonId
// @desc    Delete a lesson
// @access  Private (Instructor of the course, Admin)
exports.deleteLesson = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "User not authenticated" });
  }

  const { courseId, moduleId, lessonId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    // Authorization: Check if logged-in user is the instructor of this course or an admin
    if (course.instructorId.toString() !== req.session.userId /* && !isAdminRole(req.session.userRoles) */) {
      return res.status(403).json({ msg: "User not authorized to delete lessons from this module" });
    }

    const lesson = await Lesson.findOne({ _id: lessonId, moduleId, courseId });
    if (!lesson) {
      return res.status(404).json({ msg: "Lesson not found in this module" });
    }

    await Lesson.findByIdAndDelete(lessonId);

    // Remove lesson reference from the module
    const module = await Module.findById(moduleId);
    if (module) {
      module.lessons.pull(lessonId);
      await module.save();
    }

    res.json({ msg: "Lesson removed" });
  } catch (err) {
    console.error(err.message);
    if (err.name === 'CastError') {
        return res.status(400).json({ msg: 'Invalid ID format' });
    }
    res.status(500).send("Server Error");
  }
  // lessonController.js - Connect course content
exports.getCourseContent = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId)
      .populate({
        path: 'modules',
        populate: {
          path: 'lessons',
          model: 'Lesson'
        }
      });

    if (!course) return res.status(404).json({ msg: 'Course not found' });

    const content = course.modules.map(module => ({
      title: module.title,
      lessons: module.lessons.map(lesson => ({
        id: lesson._id,
        title: lesson.title,
        type: lesson.lessonType,
        duration: lesson.duration,
        content: lesson.content
      }))
    }));

    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
};
