const db = require('../connection');

const getLogin = (email, password) => {
  const queryString = `SELECT email, password FROM users
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


module.exports = { getLogin, checkEmailExists, insertUser };
