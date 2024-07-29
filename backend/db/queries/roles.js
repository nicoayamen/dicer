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
  return db.query(queryString, values).then(data => data.rows[0]);
};

module.exports = { getRoleById, getRoleByUserId, updateRole };
