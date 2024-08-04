const db = require('../connection');

//Get users that haven't been matched with yet
const getUmatchedUsers = (userId) => {
  const queryString = `
    SELECT users.*, roles.class, roles.is_dm, roles.bio
    FROM users
    LEFT JOIN roles ON users.role_id = roles.id
    WHERE users.id != $1
      AND users.id NOT IN (
        SELECT matched_user_id FROM matches WHERE user_id = $1
      );
  `;
  const values = [userId];

  return db.query(queryString, values)
    .then(data => data.rows)
    .catch((err) => {
      console.log(err.message);
    });
};

//Insert a new matched user
const insertMatch = (userId, matchedUserId) => {
  const queryString = `INSERT INTO matches (user_id, matched_user_id)
  VALUES ($1, $2)
  RETURNING *;
  `;
  const values = [userId, matchedUserId];

  return db.query(queryString, values)
    .then(data => {
      console.log("Insert successful, returning data:", data.rows); // Debugging
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//Get the ids of the matched users
const getMatches = (userId) => {
  const queryString = `SELECT matched_user_id
  FROM matches 
  WHERE user_id = $1;
  `;
  const values = [userId];

  return db.query(queryString, values)
    .then(data => {
      console.log("Getting matches:", data.rows); // Debugging
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//Get the names of the matched users
const getMatchDetails = (userId) => {
  const queryString = `
    SELECT m.id AS match_id,
           u2.id AS user_id,
           u2.first_name AS matched_user_first_name,
           u2.last_name AS matched_user_last_name,
           u2.photo AS matched_user_photo
    FROM matches m
    JOIN users u2 ON m.matched_user_id = u2.id
    WHERE m.user_id = $1;
  `;
  const values = [userId];

  return db.query(queryString, values)
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
      throw err; // Make sure to throw error so that it can be caught in the route handler
    });
};

//Filter potential matches
const filterUsers = (userId, role, isDM) => {
  const queryString = `
  SELECT users.*, roles.class, roles.is_dm, roles.bio
  FROM users
  LEFT JOIN roles ON users.role_id = roles.id
  WHERE users.id != $1
    AND roles.class = $2
    AND roles.is_dm = $3
    AND users.id NOT IN (
      SELECT matched_user_id FROM matches WHERE user_id = $1
    );
`;
  const values = [userId, role, isDM];

  return db.query(queryString, values)
  .then(data => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}

module.exports = { insertMatch, getMatchDetails, getMatches, getUmatchedUsers, filterUsers };