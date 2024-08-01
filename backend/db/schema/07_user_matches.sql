-- Drop and recreate user_matches table
DROP TABLE IF EXISTS user_matches CASCADE;
CREATE TABLE user_matches (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  match_id INTEGER REFERENCES matches(id)
);

-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS after_match_insert ON matches;

-- Drop the trigger function if it exists
DROP FUNCTION IF EXISTS add_match_to_user;

-- Create the trigger function
CREATE OR REPLACE FUNCTION add_match_to_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_matches (user_id, match_id)
  VALUES (NEW.user_id, NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
CREATE TRIGGER after_match_insert
AFTER INSERT ON matches
FOR EACH ROW
EXECUTE PROCEDURE add_match_to_user();