// routes/index.js
const express = require('express');
const authRoutes = require('./authRoutes');
const chatRoutes = require('./chatRoutes');
const userRoutes = require('./userRoutes');
const giphyRoutes = require('./giphyRoutes');

const router = express.Router();

// Use Routes
router.use('/auth', authRoutes);
router.use('/chat', chatRoutes);
router.use('/users', userRoutes);
router.use('/giphy', giphyRoutes);

module.exports = router;