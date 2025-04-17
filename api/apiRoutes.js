const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const usersFilePath = path.join(__dirname, '../models/users.json');

// Login route (Handles both user and admin authentication)
router.post('/login', (req, res, next) => {
  const { username, password, role } = req.body;

  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err) return next(err);

    let users = [];
    if (data) {
      users = JSON.parse(data);
    }

    const user = users.find(u => u.username === username);

    if (user) {
      if (user.password === password) {
        if (user.role === role) {
          if (role === 'admin') {
            return res.status(302).redirect('/api/adminDashboard');
          } else {
            return res.status(302).redirect('/api/userDashboard');
          }
        } else {
          // Wrong role selected
          return res.status(401).render('login', {
            title,
            message: 'Incorrect role selected. Please try again.',
            username,
            role
          });
        }
      } else {
        return res.status(401).render('login', {
          title,
          message: 'Invalid password. Please try again.',
          username,
          role
        });
      }
    } else {
      return res.status(401).render('login', {
        title,
        message: 'Invalid credentials. Please try again.',
        username,
        role
      });
    }
  });
});


// Register route (Prevents duplicate usernames)
router.post('/register', (req, res, next) => {
  const { username, password, role } = req.body;
  const newUser = { username, password, role };

  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err) return next(err);

    let users = [];
    if (data) {
      users = JSON.parse(data);
    }

    // Check if the username already exists
    if (users.some(u => u.username === username)) {
      return res.status(400).render('register', { 
        title: 'CrestStay | Create Account', 
        roles: ['user', 'admin'], // or fetch dynamically from the database
        selectedRole: role,
        message: 'Username already exists. Please choose another one.'
      });
    }

    users.push(newUser);
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) return next(err);

      // Redirect based on the new user's role
      if (newUser.role === 'admin') {
        return res.status(302).redirect('/api/adminDashboard'); // Redirect admins
      } else {
        return res.status(302).redirect('/api/userDashboard'); // Redirect regular users
      }
    });
  });
});

module.exports = router;