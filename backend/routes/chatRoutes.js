// routes/chatRoutes.js
const express = require('express');
const chatController = require('../controllers/chatController');
const auth = require('../middleware/auth');
const router = express.Router();

// Create Room
router.post('/rooms', auth, chatController.createRoom);

// Get Room Messages
router.get('/rooms/:roomId/messages', auth, chatController.getRoomMessages);

// Send Message
router.post('/messages', auth, chatController.sendMessage);

// Invite User to Room
router.post('/rooms/:roomId/invite', auth, chatController.inviteUser);

// Add Reaction to Message
router.post('/messages/:messageId/reactions', auth, chatController.addReaction);

module.exports = router;