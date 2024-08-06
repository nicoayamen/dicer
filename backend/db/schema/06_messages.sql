DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender_id INT REFERENCES users(id) ON DELETE CASCADE,  -- Added ON DELETE CASCADE to remove messages sent by the user if deleted
  receiver_id INT REFERENCES users(id) ON DELETE CASCADE,  -- Added ON DELETE CASCADE to remove messages received by the user if deleted
  content TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
