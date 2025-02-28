const socketIo = require('socket.io');

const setupNewsSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Subscribe to a category
    socket.on('subscribe', (category) => {
      socket.join(category);
      console.log(`Client ${socket.id} subscribed to ${category}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};

module.exports = setupNewsSocket;