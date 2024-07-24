-- Create enum type for character classes
DROP TYPE IF EXISTS class_type;
CREATE TYPE class_type AS ENUM (
  'Barbarian',
  'Bard',
  'Cleric',
  'Druid',
  'Fighter',
  'Monk',
  'Multiclass',
  'Paladin',
  'Ranger',
  'Rogue',
  'Sorcerer',
  'Warlock',
  'Wizard'
);

-- Drop and recreate roles table
DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles (
  id SERIAL PRIMARY KEY NOT NULL,
  is_DM BOOLEAN,
  character_name VARCHAR(255),
  class class_type,
  bio TEXT
);
