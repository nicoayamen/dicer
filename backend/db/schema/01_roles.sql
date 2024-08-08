-- Drop the roles table if it exists
DROP TABLE IF EXISTS roles CASCADE;

-- Drop the enum type if it exists
DROP TYPE IF EXISTS class_type CASCADE;

-- Create enum type for character classes
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

-- Recreate the roles table
CREATE TABLE roles (
  id SERIAL PRIMARY KEY NOT NULL,
  is_DM BOOLEAN,
  class class_type,
  bio TEXT
);
