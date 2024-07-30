const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');

router.get('/match/:getId', (req, res) => {
  const getId = req.params.getId;
  console.log("backend", getId);

  userQueries.getUserById(getId)
  .then(user => {
    if (!user || user.length === 0) {
      return res.status(401).send({ error: "No user found" });
    }
    console.log("User found:", user); 
    res.json({ success: true, user });
  })
  .catch(err => {
    res.status(500).json({ error: err.message })
  });
})

module.exports = router;