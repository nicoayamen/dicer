-- Drop and recreate availabilities table
DROP TABLE IF EXISTS availabilities CASCADE;
CREATE TABLE availabilities (
  id SERIAL PRIMARY KEY NOT NULL,
  week_day VARCHAR(50) NOT NULL,
  time TIME NOT NULL,
  time_zone VARCHAR(50) NOT NULL
);
