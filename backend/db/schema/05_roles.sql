-- Create enum type first
DROP TYPE IF EXISTS class_type;
CREATE TYPE class_type AS ENUM ('Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Multiclass', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard');

-- Create roles table second
DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles (
  id SERIAL PRIMARY KEY NOT NULL,
  is_DM BOOLEAN NOT NULL,
  character_name VARCHAR(255),
  class class_type NOT NULL,
  bio TEXT
);
