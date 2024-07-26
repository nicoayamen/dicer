const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');

// Define the POST /login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log("getting data", email, password);

  userQueries.getLogin(email, password)
    .then(user => {
      if (!user || user.length === 0) {
        return res.status(401).send({ error: "Email and password do not match" });
      }
      res.json({ success: true, user });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
