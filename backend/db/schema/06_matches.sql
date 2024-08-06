-- Drop and recreate matches table
DROP TABLE IF EXISTS matches CASCADE;
CREATE TABLE matches (
  id SERIAL PRIMARY KEY NOT NULL,
  matched_user_id INTEGER,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE  -- Added ON DELETE CASCADE to remove match records when the user is deleted
);
