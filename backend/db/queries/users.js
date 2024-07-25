const db = require('../connection');

const getLogin = (email, id) => {
  const queryString = `SELECT email, id FROM users
  WHERE email = $1
  AND id = $2;
  `;
  const values = [email, id];

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
