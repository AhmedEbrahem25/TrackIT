const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const Lesson = require("../models/Lesson");
const Course = require("../models/Course"); // For authorization
const UserAnswer = require("../models/UserAnswer"); // For submitting answers
const { validationResult } = require("express-validator");

// @route   POST api/lessons/:lessonId/quizzes (if quiz is tied to a lesson)
// @route   POST api/courses/:courseId/quizzes (if quiz is a standalone course quiz)
// @desc    Create a new quiz
// @access  Private (Instructor, Admin)
exports.createQuiz = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!req.session.userId) {
    return res.status(401).json({ msg: "User not authenticated" });
  }

  const { title, description, timeLimit, passingScorePercentage, aiGradingEnabled } = req.body;
  const { lessonId, courseId } = req.params; // One of these will be present depending on the route

  try {
    let courseForAuth;
    if (lessonId) {
      const lesson = await Lesson.findById(lessonId).populate("courseId");
      if (!lesson) return res.status(404).json({ msg: "Lesson not found" });
      courseForAuth = lesson.courseId;
    } else if (courseId) {
      courseForAuth = await Course.findById(courseId);
      if (!courseForAuth) return res.status(404).json({ msg: "Course not found" });
    } else {
      return res.status(400).json({ msg: "Quiz must be associated with a lesson or a course" });
    }

    // Authorization: Check if logged-in user is the instructor of this course or an admin
    if (courseForAuth.instructorId.toString() !== req.session.userId /* && !isAdmin */) {
      return res.status(403).json({ msg: "User not authorized to create quizzes for this content" });
    }

    const newQuiz = new Quiz({
      title,
      description,
      lessonId: lessonId || null,
      courseId: courseId || (lessonId ? courseForAuth._id : null),
      timeLimit,
      passingScorePercentage,
      aiGradingEnabled,
      questions: [], // Questions will be added separately
    });

    const quiz = await newQuiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'CastError') {
        return res.status(400).json({ msg: 'Invalid ID format for lesson or course' });
    }
    res.status(500).send("Server Error");
  }
};

// @route   GET api/quizzes/:quizId
// @desc    Get a specific quiz by ID (with questions)
// @access  Private (Enrolled users with access to lesson/course, Instructor, Admin)
exports.getQuizById = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "User not authenticated" });
  }
  try {
    const quiz = await Quiz.findById(req.params.quizId).populate("questions");

    if (!quiz) {
      return res.status(404).json({ msg: "Quiz not found" });
    }

    // Authorization: Check if user has access to the course/lesson this quiz belongs to
    // This requires checking enrollment or ownership
    // const courseToCheck = quiz.courseId || (quiz.lessonId ? (await Lesson.findById(quiz.lessonId).populate('courseId')).courseId : null);
    // if (courseToCheck) { ... authorization logic ... }

    res.json(quiz);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'CastError') {
        return res.status(400).json({ msg: 'Invalid Quiz ID format' });
    }
    res.status(500).send("Server Error");
  }
};

// @route   PUT api/quizzes/:quizId
// @desc    Update a quiz (details, not questions here)
// @access  Private (Instructor, Admin)
exports.updateQuiz = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!req.session.userId) {
    return res.status(401).json({ msg: "User not authenticated" });
  }

  const { title, description, timeLimit, passingScorePercentage, aiGradingEnabled } = req.body;
  const quizId = req.params.quizId;

  const quizFields = {};
  if (title !== undefined) quizFields.title = title;
  if (description !== undefined) quizFields.description = description;
  if (timeLimit !== undefined) quizFields.timeLimit = timeLimit;
  if (passingScorePercentage !== undefined) quizFields.passingScorePercentage = passingScorePercentage;
  if (aiGradingEnabled !== undefined) quizFields.aiGradingEnabled = aiGradingEnabled;

  try {
    let quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ msg: "Quiz not found" });
    }

    const courseForAuth = quiz.courseId ? await Course.findById(quiz.courseId) : (quiz.lessonId ? (await Lesson.findById(quiz.lessonId).populate('courseId')).courseId : null);
    if (!courseForAuth || courseForAuth.instructorId.toString() !== req.session.userId /* && !isAdmin */) {
        return res.status(403).json({ msg: "User not authorized to update this quiz" });
    }

    quiz = await Quiz.findByIdAndUpdate(
      quizId,
      { $set: quizFields },
      { new: true, runValidators: true }
    );

    res.json(quiz);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'CastError') {
        return res.status(400).json({ msg: 'Invalid Quiz ID format' });
    }
    res.status(500).send("Server Error");
  }
};

// @route   DELETE api/quizzes/:quizId
// @desc    Delete a quiz (and its questions)
// @access  Private (Instructor, Admin)
exports.deleteQuiz = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "User not authenticated" });
  }
  const quizId = req.params.quizId;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ msg: "Quiz not found" });
    }

    const courseForAuth = quiz.courseId ? await Course.findById(quiz.courseId) : (quiz.lessonId ? (await Lesson.findById(quiz.lessonId).populate('courseId')).courseId : null);
    if (!courseForAuth || courseForAuth.instructorId.toString() !== req.session.userId /* && !isAdmin */) {
        return res.status(403).json({ msg: "User not authorized to delete this quiz" });
    }

    // Delete all questions associated with this quiz
    await Question.deleteMany({ quizId: quiz._id });
    // Delete all user answers associated with this quiz
    await UserAnswer.deleteMany({ quizId: quiz._id });

    await Quiz.findByIdAndDelete(quizId);

    res.json({ msg: "Quiz and associated questions/answers removed" });
  } catch (err) {
    console.error(err.message);
    if (err.name === 'CastError') {
        return res.status(400).json({ msg: 'Invalid Quiz ID format' });
    }
    res.status(500).send("Server Error");
  }
};

// @route   POST api/quizzes/:quizId/submit
// @desc    Submit answers for a quiz
// @access  Private (Enrolled Learner)
exports.submitQuizAnswers = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!req.session.userId) {
    return res.status(401).json({ msg: "User not authenticated" });
  }

  const { answers } = req.body; // Expecting an array of { questionId: "...", answer: "..." }
  const quizId = req.params.quizId;

  try {
    const quiz = await Quiz.findById(quizId).populate('questions');
    if (!quiz) {
      return res.status(404).json({ msg: "Quiz not found" });
    }

    // Authorization: Check if user is enrolled and has access to this quiz
    // This requires checking enrollment for the course the quiz belongs to.

    // Prevent re-submission if already submitted (optional, based on requirements)
    const existingSubmission = await UserAnswer.findOne({ userId: req.session.userId, quizId });
    if (existingSubmission) {
        return res.status(400).json({ msg: "You have already submitted this quiz." });
    }

    let score = 0;
    let correctAnswersCount = 0;
    const processedAnswers = [];

    for (const submittedAnswer of answers) {
      const question = quiz.questions.find(q => q._id.toString() === submittedAnswer.questionId);
      if (question) {
        processedAnswers.push({ questionId: question._id, answer: submittedAnswer.answer });
        // Basic scoring logic (can be expanded for different question types)
        if (question.questionType === "single_choice" || question.questionType === "multiple_choice") {
          const correctAnswerOption = question.options.find(opt => opt.isCorrect);
          if (correctAnswerOption && correctAnswerOption.text === submittedAnswer.answer) {
            score += question.points || 1;
            correctAnswersCount++;
          }
        } else if (question.questionType === "true_false") {
          if (question.correctAnswer === (submittedAnswer.answer === "true" || submittedAnswer.answer === true)) {
            score += question.points || 1;
            correctAnswersCount++;
          }
        } else {
          // For short_answer or essay, AI or manual grading would be needed.
          // For now, these are not auto-scored here.
        }
      }
    }

    const totalQuestions = quiz.questions.length;
    const percentageScore = totalQuestions > 0 ? (score / (quiz.questions.reduce((sum, q) => sum + (q.points || 1), 0))) * 100 : 0;
    const isPassed = quiz.passingScorePercentage !== undefined ? percentageScore >= quiz.passingScorePercentage : true; // Default to pass if no passing score defined

    const userAnswer = new UserAnswer({
      userId: req.session.userId,
      quizId,
      lessonId: quiz.lessonId,
      courseId: quiz.courseId,
      answers: processedAnswers,
      score,
      isPassed,
      // aiFeedback will be populated if aiGradingEnabled and integrated
    });

    await userAnswer.save();

    res.status(201).json({
      submissionId: userAnswer._id,
      score,
      totalQuestions,
      percentageScore,
      isPassed,
      msg: "Quiz submitted successfully."
    });

  } catch (err) {
    console.error(err.message);
    if (err.name === 'CastError') {
        return res.status(400).json({ msg: 'Invalid ID format' });
    }
    res.status(500).send("Server Error");
  }
};

// @route   GET api/quizzes/:quizId/result/:submissionId
// @desc    Get the result of a specific quiz submission
// @access  Private (User who submitted, Instructor, Admin)
exports.getQuizSubmissionResult = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "User not authenticated" });
    }
    const { quizId, submissionId } = req.params;

    try {
        const submission = await UserAnswer.findById(submissionId)
            .populate("userId", "firstName lastName")
            .populate({
                path: "quizId",
                model: "Quiz",
                populate: { path: "questions", model: "Question" }
            });

        if (!submission) {
            return res.status(404).json({ msg: "Submission not found" });
        }

        // Authorization: Ensure the logged-in user is the one who made the submission or an instructor/admin
        const quiz = submission.quizId;
        const courseForAuth = quiz.courseId ? await Course.findById(quiz.courseId) : (quiz.lessonId ? (await Lesson.findById(quiz.lessonId).populate('courseId')).courseId : null);

        if (submission.userId._id.toString() !== req.session.userId && 
            (!courseForAuth || courseForAuth.instructorId.toString() !== req.session.userId /* && !isAdmin */)) {
            return res.status(403).json({ msg: "User not authorized to view this submission" });
        }

        res.json(submission);
    } catch (err) {
        console.error(err.message);
        if (err.name === 'CastError') {
            return res.status(400).json({ msg: 'Invalid ID format' });
        }
        res.status(500).send("Server Error");
    }
};
