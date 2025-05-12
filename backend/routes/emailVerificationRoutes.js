const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

// @route   POST api/auth/send-verification
// @desc    Send verification email
// @access  Private
router.post('/send-verification', async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ msg: 'User is already verified' });
    }

    // Generate verification token
    const token = crypto.randomBytes(20).toString('hex');
    user.verificationToken = token;
    await user.save();

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      to: user.email,
      from: 'verify@example.com',
      subject: 'Email Verification',
      text: `You are receiving this because you need to verify your email address.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://${req.headers.host}/api/auth/verify-email/${token}\n\n
        If you did not request this, please ignore this email.\n`
    };

    await transporter.sendMail(mailOptions);
    res.json({ msg: 'Verification email sent' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/auth/verify-email/:token
// @desc    Verify email
// @access  Public
router.get('/verify-email/:token', async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });
    if (!user) {
      return res.status(400).json({ msg: 'Verification token is invalid' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({ msg: 'Email verified successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;