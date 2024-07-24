-- Drop and recreate user_parties table
DROP TABLE IF EXISTS user_parties CASCADE;
CREATE TABLE user_parties (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  party_id INTEGER REFERENCES parties(id)
);
