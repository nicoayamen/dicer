// load .env data into process.env
require('dotenv').config();

// Web server config
//const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./db/connection');

const PORT = process.env.PORT || 8080;
const app = express();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
// app.use(
//   '/styles',
//   sassMiddleware({
//     source: __dirname + '/styles',
//     destination: __dirname + '/public/styles',
//     isSass: false, // false => scss, true => sass
//   })
// );
app.use(express.static('public'));
app.use(bodyParser.json());

// Separated Routes for each Resource
const loginRoute = require('./routes/login');
const signupRoutes = require('./routes/signup');
const matchRoute = require('./routes/match')

// Mount all resource routes
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/', loginRoute);
app.use('/signup', signupRoutes);
app.use('/profile', matchRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
