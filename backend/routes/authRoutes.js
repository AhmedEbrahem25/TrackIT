const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', [
  check('firstName', 'First name is required').not().isEmpty(),
  check('lastName', 'Last name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      firstName,
      lastName,
      email,
      password,
      roles: ['learner']
    });

    await user.save();

    // Create token
    const payload = {
      user: {
        id: user.id,
        roles: user.roles
      }
    };

    jwt.sign(
      payload,
      'your-secret-key',
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
// In authRoutes.js
// In authRoutes.js - update the login route
router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // Create token using the method from User model
    const token = user.generateJWT();
    
    // Return the response in a consistent format
    res.json({ 
      token,
      user: user.toAuthJSON() // Use the toAuthJSON method from User model
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});
// @route   GET api/auth/logout
// @desc    Logout user
// @access  Private
// In authRoutes.js - update the logout route
router.get('/logout', (req, res) => {
  try {
    // If using sessions, destroy the session
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          console.error('Session destruction error:', err);
          return res.status(500).json({ msg: 'Error destroying session' });
        }
      });
    }

    // Clear any cookies if needed
    res.clearCookie('connect.sid');
    
    // Return success response
    res.json({ success: true, msg: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ msg: 'Server error during logout' });
  }
});
module.exports = router;