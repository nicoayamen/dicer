# Dicer Database

## Database Set Up & Ownership
### Database Basic Info:

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

## Updating the Database Ownership
1. Manually run all schema and seed files in the db to ensure all base data exists:
  - open psql db
  - run each schema file manually
  - run each seed file manually

2. Update the ownership for all your tables to dicer:
    ```
    ALTER TABLE roles OWNER TO dicer;
    ALTER TABLE availabilities OWNER TO dicer;
    ALTER TABLE parties OWNER TO dicer;
    ALTER TABLE users OWNER TO dicer;
    ALTER TABLE user_parties OWNER TO dicer;
    ```

3. DB reset: ```npm run db:reset```


# Accessing and Resetting the Database

## Accessing the Database
Type the following commands into the terminal:

```
psql -U labber
\c finals
```

## Resetting the Database:
Run this command to reset the database: ``` npm run db:reset```

- check changes in psql tables to ensure changes are reflected


## Run Queries in DB to Confirm DB Reset Worked
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


# Manually Running the Database
## Manually Running the Schema Files
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

## Manually Seeding the Database
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
dh
