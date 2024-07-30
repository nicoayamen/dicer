-- Drop and recreate user_matches table
DROP TABLE IF EXISTS user_matches CASCADE;
CREATE TABLE user_matches (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  match_id INTEGER REFERENCES matches(id)
);
