const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');
const roleQueries = require('../db/queries/roles');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Route to get user profile by ID
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;

  Promise.all([
    userQueries.getUserById(userId),
    roleQueries.getRoleByUserId(userId)
  ])
    .then(([user, role]) => {
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

// Route to update user profile by ID
router.post('/:userId', upload.single('photo'), (req, res) => {
  const userId = req.params.userId;
  const { firstName, lastName, email, classType, isDM, bio, roleId: existingRoleId } = req.body;

  // Fetch current user data to get the existing photo
  userQueries.getProfileById(userId)
    .then(user => {
      let existingPhoto = user.photo;
      let photo = existingPhoto;
      if (req.file) {
        photo = req.file.filename;
      }

      console.log("existingRoleId:", existingRoleId);

      // Handle role update or creation
      (existingRoleId ? roleQueries.updateRole(existingRoleId, { classType, isDM, bio })
        : roleQueries.createRole({ classType, isDM, bio }))
        .then((role) => {
          return userQueries.updateUser(userId, { firstName, lastName, email, photo, roleId: role.id })
            .then(updatedUser => {
              res.status(200).json({ user: updatedUser, role });
            })
            .catch(err => {
              console.error('Error updating profile:', err);
              res.status(500).json({ error: 'Internal server error' });
            });
        });
    })
    .catch(err => {
      console.error('Error fetching existing user photo:', err);
      res.status(500).json({ error: 'Failed to fetch user data' });
    });
});

module.exports = router;
