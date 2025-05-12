const Question = require("../models/Question");
const Quiz = require("../models/Quiz");
const Course = require("../models/Course"); // For authorization
const { validationResult } = require("express-validator");

// @route   POST api/quizzes/:quizId/questions
// @desc    Add a new question to a quiz
// @access  Private (Instructor, Admin)
exports.addQuestionToQuiz = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!req.session.userId) {
    return res.status(401).json({ msg: "User not authenticated" });
  }

  const { text, questionType, options, correctAnswer, points, aiGradingHints } = req.body;
  const { quizId } = req.params;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ msg: "Quiz not found" });
    }

    const courseForAuth = quiz.courseId ? await Course.findById(quiz.courseId) : (quiz.lessonId ? (await Lesson.findById(quiz.lessonId).populate('courseId')).courseId : null);
    if (!courseForAuth || courseForAuth.instructorId.toString() !== req.session.userId /* && !isAdmin */) {
        return res.status(403).json({ msg: "User not authorized to add questions to this quiz" });
    }

    const newQuestion = new Question({
      quizId,
      text,
      questionType,
      options, // Ensure options structure matches schema (e.g., [{ text: "...", isCorrect: true/false }])
      correctAnswer,
      points,
      aiGradingHints,
    });

    const question = await newQuestion.save();

    // Add question reference to the quiz
    quiz.questions.push(question._id);
    await quiz.save();

    res.status(201).json(question);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'CastError' && err.path === '_id') {
        return res.status(400).json({ msg: 'Invalid Quiz ID format' });
    }
    res.status(500).send("Server Error");
  }
};

// @route   GET api/quizzes/:quizId/questions/:questionId
// @desc    Get a specific question from a quiz
// @access  Private (Instructor, Admin - or enrolled users if questions are shown before/after quiz)
exports.getQuestionById = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "User not authenticated" });
  }
  const { quizId, questionId } = req.params;

  try {
    const question = await Question.findOne({ _id: questionId, quizId });
    if (!question) {
      return res.status(404).json({ msg: "Question not found in this quiz" });
    }

    // Authorization: Check if user has rights to view this question (e.g., instructor of course)
    const quiz = await Quiz.findById(quizId);
    const courseForAuth = quiz.courseId ? await Course.findById(quiz.courseId) : (quiz.lessonId ? (await Lesson.findById(quiz.lessonId).populate('courseId')).courseId : null);
    if (!courseForAuth || courseForAuth.instructorId.toString() !== req.session.userId /* && !isAdmin and not enrolled student during quiz */) {
        // More complex logic needed for student access during quiz attempt
        // For now, restricting to instructor/admin
        // return res.status(403).json({ msg: "User not authorized to view this question" });
    }

    res.json(question);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'CastError') {
        return res.status(400).json({ msg: 'Invalid ID format' });
    }
    res.status(500).send("Server Error");
  }
};

// @route   PUT api/quizzes/:quizId/questions/:questionId
// @desc    Update a question in a quiz
// @access  Private (Instructor, Admin)
exports.updateQuestion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!req.session.userId) {
    return res.status(401).json({ msg: "User not authenticated" });
  }

  const { text, questionType, options, correctAnswer, points, aiGradingHints } = req.body;
  const { quizId, questionId } = req.params;

  const questionFields = {};
  if (text !== undefined) questionFields.text = text;
  if (questionType !== undefined) questionFields.questionType = questionType;
  if (options !== undefined) questionFields.options = options;
  if (correctAnswer !== undefined) questionFields.correctAnswer = correctAnswer;
  if (points !== undefined) questionFields.points = points;
  if (aiGradingHints !== undefined) questionFields.aiGradingHints = aiGradingHints;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ msg: "Quiz not found" });
    }

    const courseForAuth = quiz.courseId ? await Course.findById(quiz.courseId) : (quiz.lessonId ? (await Lesson.findById(quiz.lessonId).populate('courseId')).courseId : null);
    if (!courseForAuth || courseForAuth.instructorId.toString() !== req.session.userId /* && !isAdmin */) {
        return res.status(403).json({ msg: "User not authorized to update questions in this quiz" });
    }

    let question = await Question.findOne({ _id: questionId, quizId });
    if (!question) {
      return res.status(404).json({ msg: "Question not found in this quiz" });
    }

    question = await Question.findByIdAndUpdate(
      questionId,
      { $set: questionFields },
      { new: true, runValidators: true }
    );

    res.json(question);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'CastError') {
        return res.status(400).json({ msg: 'Invalid ID format' });
    }
    res.status(500).send("Server Error");
  }
};

// @route   DELETE api/quizzes/:quizId/questions/:questionId
// @desc    Delete a question from a quiz
// @access  Private (Instructor, Admin)
exports.deleteQuestion = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "User not authenticated" });
  }
  const { quizId, questionId } = req.params;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ msg: "Quiz not found" });
    }

    const courseForAuth = quiz.courseId ? await Course.findById(quiz.courseId) : (quiz.lessonId ? (await Lesson.findById(quiz.lessonId).populate('courseId')).courseId : null);
    if (!courseForAuth || courseForAuth.instructorId.toString() !== req.session.userId /* && !isAdmin */) {
        return res.status(403).json({ msg: "User not authorized to delete questions from this quiz" });
    }

    const question = await Question.findOne({ _id: questionId, quizId });
    if (!question) {
      return res.status(404).json({ msg: "Question not found in this quiz" });
    }

    await Question.findByIdAndDelete(questionId);

    // Remove question reference from the quiz
    quiz.questions.pull(questionId);
    await quiz.save();

    res.json({ msg: "Question removed from quiz" });
  } catch (err) {
    console.error(err.message);
    if (err.name === 'CastError') {
        return res.status(400).json({ msg: 'Invalid ID format' });
    }
    res.status(500).send("Server Error");
  }
};
