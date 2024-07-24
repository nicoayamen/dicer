# Dicer Database

## Database Basic Info:
  user: 'dicer',
  host: 'localhost',
  database: 'finals',
  password: 'dicer',
  port: 5432, // can be changed to match whichever port we use


## Setting up Your Database Access
Run the following in your terminal:

  psql -U labber
  CREATE ROLE dicer WITH LOGIN password 'dicer';
  CREATE DATABASE finals OWNER dicer;

## Accessing Database via the Terminal:
Type the following commands into your terminal:

  psql -U labber
  \c finals


## Running the Schema Files
* Ensure you are in the backend/db/schema folder when you enter the db or you will need to include the full path in these commands:

  psql -U labber
  \c finals
  \i 01_roles.sql
  \i 02_availabilities.sql
  \i 03_parties.sql
  \i 04_users.sql
  \i 05_user_parties.sql


## Seeding the Database (A WORK IN PROGRESS DONT USE YET PLEASE)
psql -U dicer -d finals -f /path/to/01_roles_seeds.sql
psql -U dicer -d finals -f /path/to/02_availabilities_seeds.sql
psql -U dicer -d finals -f /path/to/03_parties_seeds.sql
psql -U dicer -d finals -f /path/to/04_users_seeds.sql
psql -U dicer -d finals -f /path/to/05_user_parties_seeds.sql



## Importing Database into Other Files
Use this to import into files: 

  const pool = require('./backend/db/db');
