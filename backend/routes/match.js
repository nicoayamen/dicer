const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');
const roleQueries = require('../db/queries/roles');
const matchQueries = require('../db/queries/match');

router.get('/match/:getId', (req, res) => {
  const getId = req.params.getId;
  console.log("backend", getId);

  Promise.all([
    userQueries.getUserById(getId),
    roleQueries.getRoleByUserId(getId)
  ])
    .then(([user, role]) => {
      //console.log("user:", user, "role:", role, "userid:", getId);
      if (user) {
        res.json({ user, role });
      } else {
        res.status(400).json({ error: 'User not found' });
      }
    })
    .catch(err => {
      console.error('Error fetching profile data:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

router.post('/match/:userId/:getId', (req, res) => {
  const { userId, getId } = req.params;

  matchQueries.insertMatch(userId, getId)
    .then(data => {
      console.log("Response data:", data); // Debugging
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;