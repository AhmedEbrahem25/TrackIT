const Module = require("../models/Module");
const Course = require("../models/Course");
const Lesson = require("../models/Lesson"); // For cascading deletes or updates if necessary
const { validationResult } = require("express-validator");

// Middleware (to be created and placed in middleware directory)
// const { isAuthenticated, isInstructorOrAdmin } = require("../middleware/authMiddleware");

// @route   POST api/courses/:courseId/modules
// @desc    Create a new module for a course
// @access  Private (Instructor of the course, Admin)
exports.createModule = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!req.session.userId) {
    return res.status(401).json({ msg: "User not authenticated" });
  }

  const { title, description, order } = req.body;
  const courseId = req.params.courseId;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    // Authorization: Check if logged-in user is the instructor of this course or an admin
    // This needs a proper role check and instructorId comparison
    if (course.instructorId.toString() !== req.session.userId /* && !isAdminRole(req.session.userRoles) */) {
      return res.status(403).json({ msg: "User not authorized to add modules to this course" });
    }

    const newModule = new Module({
      courseId,
      title,
      description,
      order,
    });

    const module = await newModule.save();

    // Add module reference to the course
    course.modules.push(module._id);
    await course.save();

    res.status(201).json(module);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'CastError' && err.path === '_id') {
        return res.status(400).json({ msg: 'Invalid Course ID format' });
    }
    res.status(500).send("Server Error");
  }
};

// @route   GET api/courses/:courseId/modules
// @desc    Get all modules for a specific course
// @access  Private (Enrolled users, Instructor of the course, Admin)
exports.getModulesForCourse = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "User not authenticated" });
  }
  const courseId = req.params.courseId;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    // Authorization: Check if user is enrolled, or is instructor/admin
    // This requires Enrollment model check or role check
    // For simplicity, assuming for now if they can access the course, they can see modules.
    // Proper check: const enrollment = await Enrollment.findOne({ userId: req.session.userId, courseId });
    // if (!enrollment && course.instructorId.toString() !== req.session.userId /* && !isAdmin */ ) {
    //   return res.status(403).json({ msg: "User not authorized to view these modules" });
    // }

    const modules = await Module.find({ courseId }).sort({ order: 1 }).populate("lessons", "title lessonType order");
    res.json(modules);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'CastError' && err.path === '_id') {
        return res.status(400).json({ msg: 'Invalid Course ID format' });
    }
    res.status(500).send("Server Error");
  }
};

// @route   GET api/courses/:courseId/modules/:moduleId
// @desc    Get a specific module by ID
// @access  Private (Enrolled users, Instructor of the course, Admin)
exports.getModuleById = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "User not authenticated" });
  }
  const { courseId, moduleId } = req.params;

  try {
    const module = await Module.findOne({ _id: moduleId, courseId }).populate("lessons", "title lessonType order isFreePreview durationEstimate");

    if (!module) {
      return res.status(404).json({ msg: "Module not found" });
    }

    // Authorization check similar to getModulesForCourse can be added here

    res.json(module);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'CastError') {
        return res.status(400).json({ msg: 'Invalid ID format' });
    }
    res.status(500).send("Server Error");
  }
};

// @route   PUT api/courses/:courseId/modules/:moduleId
// @desc    Update a module
// @access  Private (Instructor of the course, Admin)
exports.updateModule = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!req.session.userId) {
    return res.status(401).json({ msg: "User not authenticated" });
  }

  const { title, description, order } = req.body;
  const { courseId, moduleId } = req.params;

  const moduleFields = {};
  if (title !== undefined) moduleFields.title = title;
  if (description !== undefined) moduleFields.description = description;
  if (order !== undefined) moduleFields.order = order;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    // Authorization: Check if logged-in user is the instructor of this course or an admin
    if (course.instructorId.toString() !== req.session.userId /* && !isAdminRole(req.session.userRoles) */) {
      return res.status(403).json({ msg: "User not authorized to update modules for this course" });
    }

    let module = await Module.findOne({ _id: moduleId, courseId });
    if (!module) {
      return res.status(404).json({ msg: "Module not found in this course" });
    }

    module = await Module.findByIdAndUpdate(
      moduleId,
      { $set: moduleFields },
      { new: true, runValidators: true }
    );

    res.json(module);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'CastError') {
        return res.status(400).json({ msg: 'Invalid ID format' });
    }
    res.status(500).send("Server Error");
  }
};

// @route   DELETE api/courses/:courseId/modules/:moduleId
// @desc    Delete a module
// @access  Private (Instructor of the course, Admin)
exports.deleteModule = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "User not authenticated" });
  }

  const { courseId, moduleId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    // Authorization: Check if logged-in user is the instructor of this course or an admin
    if (course.instructorId.toString() !== req.session.userId /* && !isAdminRole(req.session.userRoles) */) {
      return res.status(403).json({ msg: "User not authorized to delete modules from this course" });
    }

    const module = await Module.findOne({ _id: moduleId, courseId });
    if (!module) {
      return res.status(404).json({ msg: "Module not found in this course" });
    }

    // Before deleting module, consider deleting its lessons
    await Lesson.deleteMany({ moduleId: module._id });

    await Module.findByIdAndDelete(moduleId);

    // Remove module reference from the course
    course.modules.pull(moduleId);
    await course.save();

    res.json({ msg: "Module removed" });
  } catch (err) {
    console.error(err.message);
    if (err.name === 'CastError') {
        return res.status(400).json({ msg: 'Invalid ID format' });
    }
    res.status(500).send("Server Error");
  }
};
