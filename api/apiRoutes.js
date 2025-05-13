const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login route (Handles both user and admin authentication)
router.post('/login', async (req, res, next) => {
  const { username, password, role } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).render('login', {
        title: 'CrestStay | Login',
        message: 'Invalid credentials. Please try again.',
        username,
        role
      });
    }

    if (user.password !== password) {
      return res.status(401).render('login', {
        title: 'CrestStay | Login',
        message: 'Invalid password. Please try again.',
        username,
        role
      });
    }

    if (user.role !== role) {
      return res.status(401).render('login', {
        title: 'CrestStay | Login',
        message: 'Incorrect role selected. Please try again.',
        username,
        role
      });
    }

    // Successful login
    if (role === 'admin') {
      return res.redirect('/api/adminDashboard');
    } else {
      return res.redirect('/api/userDashboard');
    }

  } catch (err) {
    return next(err);
  }
});


// Register route (Prevents duplicate usernames and adds to MongoDB)
router.post('/register', async (req, res, next) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).render('register', {
        title: 'CrestStay | Register',
        roles: ['user', 'admin'],
        selectedRole: role,
        message: 'Username already exists. Please choose another one.'
      });
    }

    const newUser = new User({ username, password, role });
    await newUser.save();

    // Redirect based on the new user's role
    if (role === 'admin') {
      return res.redirect('/api/adminDashboard');
    } else {
      return res.redirect('/api/userDashboard');
    }

  } catch (err) {
    return next(err);
  }
});

module.exports = router;
