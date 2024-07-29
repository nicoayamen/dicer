// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db/connection');
const multer = require('multer');

const PORT = process.env.PORT || 8080;
const app = express();
const http = require('http').Server(app);
const socketIO = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:3000`
  }
});

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false,
  })
);

app.use(express.static('public'));
app.use(bodyParser.json());
/// chat func starts here

app.use(cors());

let users = [];

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`)  
  socket.on("message", data => {
    socketIO.emit("messageResponse", data)
  })

  socket.on("typing", data => (
    socket.broadcast.emit("typingResponse", data)
  ))

  socket.on("newUser", data => {
    users.push(data)
    socketIO.emit("newUserResponse", users)
  })

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    users = users.filter(user => user.socketID !== socket.id)
    socketIO.emit("newUserResponse", users)
    socket.disconnect()
  });
});

// ends here 


// Separated Routes for each Resource
const loginRoute = require('./routes/login');
// const widgetApiRoutes = require('./routes/widgets-api');
// const usersRoutes = require('./routes/users');
const signupRoutes = require('./routes/signup');
const editProfileRoutes = require('./routes/editprofile')

const profileRoute = require('./routes/profile');

// Mount all resource routes
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/', loginRoute);
// app.use('/api/widgets', widgetApiRoutes);
// app.use('/users', usersRoutes);
app.use('/signup', signupRoutes);
app.use('/editprofile', editProfileRoutes)
app.use('/profile', profileRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

http.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});