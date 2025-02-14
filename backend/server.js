const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors'); // Add CORS middleware
const connectDB = require('./config/db');
const { verifyToken } = require('./middleware/auth');
const error = require('./middleware/error');
const routes = require('./routes'); // Import consolidated mega-routes (index.js)
const Message = require('./models/Message');
require('dotenv').config(); // Load environment variables

const app = express();

// Connect to database
connectDB();

// Middleware setup
app.use(cors({ origin: process.env.CLIENT_URL })); // Add CORS
app.use(express.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Consolidated routes (replaces individual route imports)
app.use('/api', routes); // All routes are prefixed with /api

// Error handling middleware
app.use(error);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Setup Socket.io
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"]
    }
});

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication error: No token provided'));
    try {
        const decoded = verifyToken(token);
        socket.user = decoded.user;
        next();
    } catch (err) {
        next(new Error('Authentication error: Invalid token'));
    }
});

io.on('connection', (socket) => {
    console.log('New client connected', socket.user?.id);

    // Join room handler
    socket.on('joinRoom', ({ roomId }) => {
        socket.join(roomId);
    });

    // Message handler
    socket.on('sendMessage', async (message) => {
        try {
            const savedMessage = await Message.create({
                ...message,
                sender: socket.user.id // Attach user ID from auth
            });
            io.to(message.room).emit('newMessage', savedMessage);
        } catch (err) {
            console.error('Message save error:', err);
        }
    });

    // Typing indicator handler (new)
    socket.on('typing', ({ roomId, isTyping }) => {
        socket.to(roomId).emit('typing', {
            userId: socket.user.id,
            isTyping
        });
    });

    // Disconnect handler
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.user?.id);
    });
});