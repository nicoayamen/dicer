const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');
const roleQueries = require('../db/queries/roles');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/:userId', (req, res) => {
  const userId = req.params.userId;

  Promise.all([
    userQueries.getUserById(userId),
    roleQueries.getRoleByUserId(userId)
  ])
    .then(([user, role]) => {
      console.log("user:", user, "role:", role, "userid:", userId);
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

router.post('/:userId', upload.single('photo'), (req, res) => {
  const userId = req.params.userId;
  const { firstName, lastName, email, classType, isDM, bio, roleId: existingRoleId } = req.body;

  // Handle file upload if present
  let photo = null;
  if (req.file) {
    photo = req.file.filename;
  }
  
  console.log("existingroleId:", existingRoleId);

  (existingRoleId ? roleQueries.updateRole(existingRoleId, { classType, isDM, bio })
    : roleQueries.createRole({ classType, isDM, bio }))
    .then((role) => {
      console.log("role:", role);
      return userQueries.updateUser(userId, { firstName, lastName, email, photo, roleId: role.id })
      .then((user) => {
        console.log("user:", user);
        res.json({ user, role });
    })
    .catch (err => {
      console.error('Error updating profile:', err);
      res.status(500).json({ error: 'Internal server error' });
    });


  // Promise.all([
  //   userQueries.updateUser(userId, { firstName, lastName, email, photo }),
  //   roleId ? roleQueries.updateRole(roleId, { classType, isDM, bio })
  // ])
  //   .then(([updatedUser, updatedRole]) => {
  //     res.json({ user: updatedUser, role: updatedRole });
  //     //console.log("updated roles:", updatedRole)  //returns undefined here!!!
  //   })
  //   .catch(err => {
  //     console.error('Error updating profile:', err);
  //     res.status(500).json({ error: 'Internal server error' });
   });
});

module.exports = router;