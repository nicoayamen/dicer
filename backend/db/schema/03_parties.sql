-- Drop and recreate parties table
DROP TABLE IF EXISTS parties CASCADE;
CREATE TABLE parties (
  id SERIAL PRIMARY KEY NOT NULL,
  chat_history TEXT,
  timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
