require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const sassMiddleware = require('./lib/sass-middleware');
const http = require('http');
const socketIO = require('socket.io');
const db = require('./db/connection');

const app = express();
const server = http.Server(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

const PORT = process.env.PORT || 8080;

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

const saveMessageToDatabase = async (message) => {
  try {
    const query = 'INSERT INTO messages (username, content, timestamp) VALUES ($1, $2, $3) RETURNING *';
    const values = [message.username, message.content, new Date()];
    const result = await db.query(query, values);
    console.log('Message saved:', result.rows[0]);
    return result.rows[0]; // Return saved message to be emitted
  } catch (error) {
    console.error('Error saving message to database:', error);
    throw error;
  }
};
let users = [];

io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  // Fetch previous messages when a user joins
  socket.on('join', async (username) => {
    try {
      // Fetch old messages from the database
      const result = await db.query('SELECT * FROM messages ORDER BY timestamp ASC');
      socket.emit('chatHistory', result.rows);
    } catch (err) {
      console.error('Error fetching chat history:', err);
    }
  });

  socket.on('message', async (data) => {
    try {
      const { username, content } = data;
      await saveMessageToDatabase({ username, content });
      io.emit('messageResponse', data); // Broadcast to all connected clients
    } catch (err) {
      console.error('Error saving message to database:', err);
    }
  });

  // Handle typing indication
  socket.on('typing', (data) => {
    const { username } = data;
    socket.broadcast.emit('typingResponse', { username });
  });

  // Handle new user connection
  socket.on('newUser', (data) => {
    users.push(data);
    io.emit('newUserResponse', users);
  });

  // Handle user disconnection
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

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});