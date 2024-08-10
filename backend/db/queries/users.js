const db = require('../connection');

const getLogin = (email, password) => {
  const queryString = `SELECT id, email, password, * FROM users
  WHERE email = $1
  AND password = $2;
  `;
  const values = [email, password];

  return db.query(queryString, values)
    .then(data => {
      console.log("query", data.rows)
      if (data.rows.length === 0) {
        console.log("not found")
        return null;
      }
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Function to check if an email already exists
const checkEmailExists = (email) => {
  const queryString = `SELECT * FROM users WHERE email = $1`;
  const values = [email];

  return db.query(queryString, values);
};

// Function to insert a new user
const insertUser = (firstName, lastName, email, password) => {
  const queryString = `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [firstName, lastName, email, password];

  return db.query(queryString, values);
};

const getUserById = (userId) => {
  const queryString = `
    SELECT users.*, roles.class, roles.is_dm, roles.bio
    FROM users
    LEFT JOIN roles ON users.role_id = roles.id
    WHERE users.id = $1;
  `;
  const values = [userId];
  return db.query(queryString, values).then(data => data.rows[0]);
};

const updateUser = (userId, { firstName, lastName, email, photo, roleId }) => {
  const queryString = `
    UPDATE users
    SET first_name = $1, last_name = $2, email = $3, photo = $4, role_id = $5
    WHERE id = $6
    RETURNING *;
  `;
  const values = [firstName, lastName, email, photo, roleId, userId];
  return db.query(queryString, values).then(data => data.rows[0]);
};


// Function to get profile by user ID
const getProfileById = (userId) => {
  const queryString = `
    SELECT id, photo, first_name, last_name
    FROM users
    WHERE id = $1;
  `;
  const values = [userId];

  return db.query(queryString, values)
    .then(data => data.rows[0])
    .catch(err => {
      console.error('Error executing query', err.stack);
      throw err;
    });
};


const deleteUserById = (userId) => {
  const queryString = `
  DELETE FROM users WHERE id = $1;
  `;
  const values = [userId];

  return db.query(queryString, values)
    .then(data => data.rows[0])
    .catch(err => {
      console.error('Error executing query', err.stack);
      throw err;
    });
}


module.exports = { getLogin, checkEmailExists, insertUser, getUserById, updateUser, getProfileById, deleteUserById };
