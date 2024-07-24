# Dicer Database

## Database Basic Info:
  user: 'dicer',
  host: 'localhost',
  database: 'finals',
  password: 'dicer',
  port: 5432, // can be changed to match whichever port we use


## Accessing Database via the Terminal:
Type the following commands into your terminal:

  psql -U development 
  \c finals


## Importing Database into Other Files:
Use this to import into files: 

  const pool = require('./backend/db/db');
