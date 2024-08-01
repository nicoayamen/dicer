const db = require('../connection');

const insertMatch = (user_id, matched_user_id) => {
  const queryString = `INSERT INTO matches (user_id, matched_user_id)
  VALUES ($1, $2)
  RETURNING *;
  `;
  const values = [user_id, matched_user_id];

  return db.query(queryString, values)
    .then(data => {
      console.log("Insert successful, returning data:", data.rows); // Debugging
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getMatches = (user_id) => {
  // const queryString = `SELECT matched_user_id
  // FROM matches 
  // WHERE user_id = $1;
  // `;
  const queryString = `SELECT m.id AS match_id,
  u2.first_name AS matched_user_first_name
  FROM matches m
  JOIN users u2 ON m.matched_user_id = u2.id
  WHERE
  m.user_id = $1;
  `;
  const values = [user_id];

  return db.query(queryString, values)
    .then(data => {
      console.log("Getting matches:", data.rows); // Debugging
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { insertMatch, getMatches };