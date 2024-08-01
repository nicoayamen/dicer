const express = require('express');
const router = express.Router();
const matchQueries = require('../db/queries/match');

router.get('/messages/:userId', (req, res) => {
  const userId = req.params.userId;

  matchQueries.getMatchNames(userId)
    .then(data => {
      const idList = data.map(item => item.matched_user_first_name);
      res.json(idList);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;