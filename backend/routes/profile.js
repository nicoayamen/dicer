const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');

// Route to get user profile
router.get('/profile/', (req, res) => {
  const userId = req.params.userId;

  userQueries.getProfileById(userId)
    .then(result => {
      if (!result) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(result);
    })
    .catch(error => {
      console.error('Server error:', error);
      res.status(500).json({ message: 'Server error' });
    });
});

module.exports = router;
