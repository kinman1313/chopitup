// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

// Update User Settings
router.put('/settings', auth, userController.updateSettings);

// Update Avatar
router.post('/avatar', auth, userController.updateAvatar);

// Get User Profile
router.get('/profile', auth, userController.getProfile);

module.exports = router;