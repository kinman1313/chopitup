// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Update User Settings
router.put('/settings', authMiddleware, userController.updateSettings);

// Update Avatar
router.post('/avatar', authMiddleware, userController.updateAvatar);

// Get User Profile
router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;