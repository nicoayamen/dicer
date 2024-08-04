const express = require('express');
const router = express.Router();
const matchQueries = require('../db/queries/match');

router.get('/messages/:userId', (req, res) => {
  const userId = req.params.userId;

  matchQueries.getMatchDetails(userId)
    .then(data => {
      res.json(data); // Send complete user details including photos
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;