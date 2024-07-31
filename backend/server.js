// Load .env data into process.env
require('dotenv').config();

// Import required modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const sassMiddleware = require('./lib/sass-middleware');
const multer = require('multer');
const http = require('http');
const socketIO = require('socket.io');
const db = require('./db/connection');

// Initialize app and server
const app = express();
const server = http.Server(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

// Define port
const PORT = process.env.PORT || 8080;

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use('/styles', sassMiddleware({
  source: __dirname + '/styles',
  destination: __dirname + '/public/styles',
  isSass: false,
}));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

// Socket.io logic
let users = [];

io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('message', (data) => {
    io.emit('messageResponse', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typingResponse', data);
  });

  socket.on('newUser', (data) => {
    users.push(data);
    io.emit('newUserResponse', users);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    users = users.filter(user => user.socketID !== socket.id);
    io.emit('newUserResponse', users);
    socket.disconnect();
  });
});

// Routes
const loginRoute = require('./routes/login');
const signupRoutes = require('./routes/signup');
const editProfileRoutes = require('./routes/editprofile');
const profileRoute = require('./routes/profile');
const deleteProfileRoute = require('./routes/deleteprofile');

app.use('/', loginRoute);
app.use('/signup', signupRoutes);
app.use('/editprofile', editProfileRoutes);
app.use('/profile', profileRoute);
app.use('/deleteprofile', deleteProfileRoute);

// Start server
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
