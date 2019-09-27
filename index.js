const express = require('express');

const app = express();

const socket = require('socket.io');

// public directory setup
app.use(express.static('public'));

// server listening code
let PORT = process.env.port || 4000;
const server = app.listen(PORT, () => {
  console.log('listening to request on port 4000');
});

// socket setup
const io = socket(server);

// creating connection and passing the single instance of connection as socket!
io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);
  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });
  socket.on('typing', (data) => {
    console.log(data);
    socket.broadcast.emit('typing', data);
  });
});
