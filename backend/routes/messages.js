const express = require('express');
const router = express.Router();
const matchQueries = require('../db/queries/match');

router.get('/messages/:userId', (req, res) => {
  const userId = req.params.userId;

  matchQueries.getMatches(userId)
    .then(data => {
      const idList = data.map(item => item.matched_user_id);
      console.log("List:", idList); // Debugging
      res.json(idList);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;