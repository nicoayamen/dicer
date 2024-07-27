const express = require('express');
const router = express.Router();
const pool = require('../db/db');

router.post('/', async (req, res) => {
  try {
    console.log('Received POST request with body:', req.body);
    const { firstName, lastName, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const newUser = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [firstName, lastName, email, password]
    );
    console.log('User inserted:', newUser.rows[0]);
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error('Error inserting user:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
