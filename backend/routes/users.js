/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const pool = require('../db/db');

router.get('/', (req, res) => {
  res.render('users');
}); 

router.post('/users', async (req, res) => {
  try {
    console.log('Received POST request with body:', req.body);
    const { firstName, lastName, email, password } = req.body;
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
