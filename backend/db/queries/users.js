const db = require('../connection');

const getLogin = (email, password) => {
  const queryString = `SELECT id, email, password FROM users
  WHERE email = $1
  AND password = $2
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

const getProfileById = (userId) => {
  const queryString = `SELECT photo, first_name, last_name FROM users WHERE id = $1`;
  const values = [userId];
  console.log(userId);

  return db.query(queryString, values)
    .then(data => {
      console.log('Query result:', data.rows); // Debug log
      return data.rows[0];
    })
    .catch(err => {
      console.error('Error executing query', err.stack);
      throw err;
    });
};



module.exports = { getLogin, checkEmailExists, insertUser, getProfileById };
