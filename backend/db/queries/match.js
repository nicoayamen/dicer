const db = require('../connection');

const insertMatch = (user_id, matched_user_id) => {
  const queryString = `INSERT INTO matches (user_id, matched_user_id)
  VALUES ($1, $2);
  `;
  const values = [user_id, matched_user_id];

  return db.query(queryString, values)
  .then(data => data.rows[0]);
};

module.exports = insertMatch