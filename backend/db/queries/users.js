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

module.exports = { getLogin };
