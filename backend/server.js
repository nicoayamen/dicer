require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const sassMiddleware = require('./lib/sass-middleware');
const http = require('http');
const socketIO = require('socket.io');
const db = require('./db/connection');
const pool = require('./db/connection');

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

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

   // Handle video call signaling
   socket.on('video-offer', (data) => {
    socket.broadcast.emit('video-offer', data);
  });

  socket.on('video-answer', (data) => {
    socket.broadcast.emit('video-answer', data);
  });

  socket.on('new-ice-candidate', (data) => {
    socket.broadcast.emit('new-ice-candidate', data);
  });

  // Handle end video chat
  socket.on('end-video-chat', () => {
    socket.broadcast.emit('end-video-chat');
  });

  // Join a chat room and fetch chat history
  socket.on('join_room', async ({ username, roomId }) => {
    socket.join(roomId);
    console.log(`User ${username} joined room ${roomId}`);
  
    // Parse roomId for chat history
    const [prefix, senderIdStr, receiverIdStr] = roomId.split('_');
    
    if (prefix !== 'chat' || isNaN(parseInt(senderIdStr)) || isNaN(parseInt(receiverIdStr))) {
      console.error('Invalid roomId format:', roomId);
      return;
    }
  
    const senderId = parseInt(senderIdStr);
    const receiverId = parseInt(receiverIdStr);
  
    // Fetch and send chat history
    try {
      const result = await pool.query(
        'SELECT sender_id, content, timestamp FROM messages WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1) ORDER BY timestamp',
        [senderId, receiverId]
      );
      socket.emit('chatHistory', result.rows);
    } catch (err) {
      console.error('Error fetching chat history:', err);
    }
  });

  // Handle sending messages
  socket.on('send_message', async (data) => {
    const { roomId, username, content } = data;
  
    // Ensure roomId is in the correct format
    const [prefix, senderIdStr, receiverIdStr] = roomId.split('_');
    
    // Validate prefix and parse IDs
    if (prefix !== 'chat' || isNaN(parseInt(senderIdStr)) || isNaN(parseInt(receiverIdStr))) {
      console.error('Invalid roomId format:', roomId);
      return;
    }
  
    const senderId = parseInt(senderIdStr);
    const receiverId = parseInt(receiverIdStr);
  
    // Save message to the database
    try {
      await pool.query(
        'INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3)',
        [senderId, receiverId, content]
      );
      io.to(roomId).emit('receive_message', { username, content });
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  socket.on('typing', (data) => {
    socket.to(data.roomId).emit('typing', data);
});

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


// Routes
const loginRoute = require('./routes/login');
const signupRoutes = require('./routes/signup');
const editProfileRoutes = require('./routes/editprofile');
const profileRoute = require('./routes/profile');
const deleteProfileRoute = require('./routes/deleteprofile');
const navbarRoute = require('./routes/navbar');
const matchRoute = require('./routes/match');
const messagesRoute = require('./routes/messages');

app.use('/', loginRoute);
app.use('/signup', signupRoutes);
app.use('/editprofile', editProfileRoutes);
app.use('/profile', profileRoute);
app.use('/deleteprofile', deleteProfileRoute);
app.use('/navbar', navbarRoute);
app.use('/profile', matchRoute);
app.use('/profile', messagesRoute);
app.use('/uploads', express.static('uploads'));


server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});