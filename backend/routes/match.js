const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');
const roleQueries = require('../db/queries/roles');
const matchQueries = require('../db/queries/match');

//Get users that haven't been matched with
router.get('/match/:userId', (req, res) => {
  const userId = req.params.userId;

  matchQueries.getUmatchedUsers(userId)
    .then(users => {
      if (users.length > 0) {
        res.json(users);
      } else {
        res.status(400).json({ error: 'No unmatched users found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

//Get filtered users that haven't been matched with
router.get('/match/:userId/:role?/:isDM?', (req, res) => {
  const userId = req.params.userId;
  const role = req.params.role || null;
  const isDM = req.params.isDM === 'true' ? true : (req.query.isDM === 'false' ? false : null);

  matchQueries.filterUsers(userId, role, isDM)
    .then(users => {
      if (users.length > 0) {
        res.json(users);
      } else {
        res.status(400).json({ error: 'No unmatched users found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});


//Insert a new match
router.post('/match/:userId/:getId', (req, res) => {
  const { userId, getId } = req.params;

  matchQueries.insertMatch(userId, getId)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;