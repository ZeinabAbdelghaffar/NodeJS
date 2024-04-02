const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect('mongodb://localhost:27017/chatApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const messageSchema = new mongoose.Schema({
  name: String,
  message: String,
});

const Message = mongoose.model('Message', messageSchema);

app.use(express.static('public'));

const rooms = new Map();

io.on('connection', async (socket) => {
  console.log('A user connected');

  let username = '';
  let roomCode = '';

  socket.on('joinRoom', (data) => {
    if (!roomCode) {
      roomCode = data.roomCode;
      if (!rooms.has(roomCode)) {
        rooms.set(roomCode, new Set());
      }
      rooms.get(roomCode).add(socket.id);
    }

    if (data.roomCode === roomCode) {
      username = data.username;
      socket.emit('joinRoomSuccess');
    } else {
      socket.emit('joinRoomFail');
    }
  });

  socket.on('message', (data) => {
    if (roomCode && rooms.has(roomCode)) {
      rooms.get(roomCode).forEach((userSocketId) => {
        io.to(userSocketId).emit('message', { name: username, message: data.message });
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    if (roomCode && rooms.has(roomCode)) {
      rooms.get(roomCode).delete(socket.id);
      if (rooms.get(roomCode).size === 0) {
        rooms.delete(roomCode);
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});