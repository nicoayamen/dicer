const db = require('../connection');

const insertMatch = (user_id, matched_user_id) => {
  const queryString = `INSERT INTO matches (user_id, matched_user_id)
  VALUES ($1, $2)
  RETURNING *;
  `;
  const values = [user_id, matched_user_id];

  return db.query(queryString, values)
  .then(data => {
    console.log("Insert successful, returning data:", data.rows) // Debugging
    return data.rows
  })
  .catch((err) => {
    console.log(err.message);
  });
};

const getMatches = (user_id) => {
  const queryString = `SELECT matched_user_id
  FROM matches 
  WHERE user_id = $1;
  `;
  const values = [user_id];

  return db.query(queryString, values)
  .then(data => {
    console.log("Getting matches:", data.rows) // Debugging
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
};

module.exports = { insertMatch, getMatches };