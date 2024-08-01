const express = require('express');
const router = express.Router();
const { getProfileById, deleteUserById } = require('../db/queries/users');

// Route to get user profile by ID
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

// Route to delete user profile by ID
router.delete('/:userId', (req, res) => {
  const { userId } = req.params;
  console.log('Received request to delete userId:', userId); // Debug log

  deleteUserById(userId)
    .then(() => {
      console.log(`User with ID ${userId} deleted successfully`); // Debug log
      res.status(200).json({ message: `User with ID ${userId} deleted successfully` });
    })
    .catch(err => {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;
