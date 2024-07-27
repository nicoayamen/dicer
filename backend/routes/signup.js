const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const userQueries = require('../db/queries/users');

router.post('/', (req, res) => {
  console.log('Received POST request with body:', req.body);
  const { firstName, lastName, email, password } = req.body;

  // Check if the email already exists
  userQueries.checkEmailExists(email)
    .then(data => {
      if (data.rows.length > 0) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      // Insert the new user
      return userQueries.insertUser(firstName, lastName, email, password)
        .then(data => {
          const newUser = data.rows[0];
          console.log('User inserted:', newUser);
          res.json(newUser);
        });
    })
    .catch(err => {
      console.error('Error:', err.message);
      res.status(500).send('Server error');
    });
});

module.exports = router;