// server.js
const express = require('express');
const http = require('http'); // Import http module
const { Server } = require('socket.io'); // Import Server from socket.io
const path = require('path'); // Import path module
const connectDB = require('./config/db');
const auth = require('./middleware/auth');
const { verifyToken } = require('./middleware/auth'); // Import verifyToken
const error = require('./middleware/error');
const userRoutes = require('./routes/user');
const roomRoutes = require('./routes/room');
const messageRoutes = require('./routes/message');
const Message = require('./models/Message'); // Import Message model

const app = express();

// Connect to database
connectDB();

// Middleware setup
app.use(express.json({ extended: false }));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/messages', messageRoutes);

// Example protected route
app.use('/api/secure-route', auth, (req, res) => {
    res.send('Secure Route Accessed');
});

// Error handling middleware should be the last middleware
app.use(error);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app); // Create server using http module

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
    try {
        const decoded = verifyToken(token);
        socket.user = decoded.user;
        next();
    } catch (err) {
        next(new Error('Authentication error'));
    }
});

io.on('connection', (socket) => {
    console.log('New client connected', socket.user);

    socket.on('joinRoom', ({ roomId }) => {
        socket.join(roomId);
    });

    socket.on('sendMessage', async (message) => {
        try {
            // Save message to DB
            const savedMessage = await Message.create(message);
            io.to(message.room).emit('newMessage', savedMessage);
        } catch (err) {
            console.error(err);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
