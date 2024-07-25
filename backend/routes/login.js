const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');

// Define the POST /login route
router.post('/login', (req, res) => {
  const { email, id } = req.body;
  console.log("getting data", email, id);

  userQueries.getLogin(email, id)
    .then(user => {
      if (!user || user.length === 0) {
        return res.status(401).send({ error: "Can't log in" });
      }
      res.json({ success: true, user });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
