const express = require('express');
const router = express.Router();
const { getProfileById } = require('../db/queries/users');

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  console.log('Received userId:', userId); // Debug log

  getProfileById(userId)
    .then(user => {
      if (user) {
        console.log('User data:', user); // Debug log
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(err => {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;
