-- Drop and recreate users table
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  photo VARCHAR(255),
  availability_id INTEGER REFERENCES availabilities(id),
  role_id INTEGER REFERENCES roles(id),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
