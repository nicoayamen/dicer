# Dicer Database

## Database Basic Info:

  user: 'dicer',

  host: 'localhost',

  database: 'finals',
  password: 'dicer',

  port: 5432, // can be changed to match whichever port we use


## Setting up Your Database Access
Run the following in your terminal:

```
psql -U labber
CREATE ROLE dicer WITH LOGIN password 'dicer';
CREATE DATABASE finals OWNER dicer;
```

## Accessing Database via the Terminal
Type the following commands into your terminal:

```
psql -U labber
\c finals
```


## Running the Schema Files
Ensure you are in the backend/db/schema folder when you enter the db or you will need to include the full path in these commands:

Enter the schema directory
```
cd backend/db/schema/
```
Enter the database:
```
psql -U labber
\c finals
```
Run the schema files:
```
\i 01_roles.sql
\i 02_availabilities.sql
\i 03_parties.sql
\i 04_users.sql
\i 05_user_parties.sql
```
Confirm all tables were made successfully:
```
\dt
```


## Seeding the Database (JUST NEEDS IMAGES ADDED)
Enter the seeds directory:
```
cd backend/db/seeds/
```
Enter the db:
```
psql -U labber
\c finals
```
Run the seed files:
```
\i 01_roles_seeds.sql
\i 02_availabilities_seeds.sql
\i 03_parties_seeds.sql
\i 04_users_seeds.sql
\i 05_user_parties_seeds.sql
```

## Run Queries in DB to Confirm Seeding Worked
Enter the seeds directory:
```
cd backend/db/seeds/
```
Enter the database:
```
psql -U labber
\c finals
```
Run the following queries to ensure seeds ran correctly:
```
SELECT * FROM roles;
SELECT * FROM availabilities;
SELECT * FROM parties;
SELECT * FROM users;
SELECT * FROM user_parties;
```


## Importing Database into Other Files
Use this to import into files: 

  const pool = require('./backend/db/db');
