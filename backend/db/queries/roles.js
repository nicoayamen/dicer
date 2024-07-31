const db = require('../connection');

const getRoleById = (roleId) => {
  const queryString = `SELECT * FROM roles WHERE id = $1;`;
  const values = [roleId];
  return db.query(queryString, values).then(data => data.rows[0]);
};

const getRoleByUserId = (userId) => {
  const queryString = `
    SELECT roles.*
    FROM roles
    JOIN users ON users.role_id = roles.id
    WHERE users.id = $1;
  `;
  const values = [userId];
  return db.query(queryString, values).then(data => data.rows[0]);
};

const updateRole = (roleId, { classType, isDM, bio }) => {

  const queryString = `
    UPDATE roles
    SET class = $1, is_dm = $2, bio = $3
    WHERE id = $4
    RETURNING *;
  `;

  const values = [classType, isDM, bio, roleId];

  return db.query(queryString, values)
    .then(data => {
      console.log('Update result:', data); // Added logging
      console.log('Rows:', data.rows); // Added logging
      
      if (data.rows.length === 0) {
        console.log('No rows returned, check roleId:', roleId);
      } else {
        console.log('Update successful:', data.rows[0]); // Existing log
      }

      return data.rows[0];
    });
    // .catch(err => {
    //   console.error('Error executing updateRole query:', err);
    //   throw err;
    // });
  
};

const createRole = ({ classType, characterName="", isDM, bio }) => {

  const queryString = `
    INSERT into roles (is_DM, character_name, class, bio) VALUES ($1, $2, $3, $4) RETURNING *;`;

  const values = [isDM, characterName, classType, bio]; 
  
  return db.query(queryString,values)
   .then(data => {
    return data.rows[0];
   })

}

module.exports = { getRoleById, getRoleByUserId, updateRole, createRole };
