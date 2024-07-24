const { Pool } = require('pg');

const pool = new Pool({
    user: 'dicer',
    host: 'localhost',
    database: 'finals',
    password: 'dicer',
    port: 5432,
});

module.exports = pool;

// use this to import into files: const pool = require('.backend/db/db');
