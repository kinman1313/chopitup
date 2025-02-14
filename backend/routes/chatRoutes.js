// routes/chatRoutes.js
const express = require('express');
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Create Chat Room
router.post('/rooms', authMiddleware, chatController.createRoom);

// Get Room Messages
router.get('/rooms/:roomId/messages', authMiddleware, chatController.getRoomMessages);

// Send Message
router.post('/messages', authMiddleware, chatController.sendMessage);

// Invite User to Room
router.post('/rooms/:roomId/invite', authMiddleware, chatController.inviteUser);

// Send Direct Message
router.post('/direct-messages', authMiddleware, chatController.sendDirectMessage);

// Add Reaction to Message
router.post('/messages/:messageId/reactions', authMiddleware, chatController.addReaction);

module.exports = router;