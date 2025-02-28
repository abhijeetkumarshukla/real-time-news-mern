const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const setupNewsSocket = require('./sockets/newsSocket');
const newsRoutes = require('./routes/newsRoutes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/news', newsRoutes);

// Setup WebSocket
const io = setupNewsSocket(server);

// Emit real-time updates when new news is added
io.on('connection', (socket) => {
  socket.on('addNews', (newNews) => {
    io.to(newNews.category).emit('newsUpdate', newNews);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));