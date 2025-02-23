const Message = require('../models/Message');
const Room = require('../models/Room');

exports.getRooms = async (req, res) => {
    try {
        const rooms = await Room.find().sort({ createdAt: -1 });
        res.json(rooms);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Create Room
exports.createRoom = async (req, res) => {
  const { name } = req.body;

  try {
    const room = new Room({ name, createdBy: req.user.id });
    await room.save();
    res.json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Send Message
exports.sendMessage = async (req, res) => {
  const { roomId, content, isVoiceMessage } = req.body;

  try {
    const message = new Message({
      sender: req.user.id,
      room: roomId,
      content,
      isVoiceMessage,
    });

    await message.save();
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get Room Messages
exports.getRoomMessages = async (req, res) => {
  const { roomId } = req.params;

  try {
    const messages = await Message.find({ room: roomId }).populate('sender', 'username avatar');
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Invite User to Room
exports.inviteUser = async (req, res) => {
  const { roomId, userId } = req.body;

  try {
    const room = await Room.findById(roomId);
    if (!room.members.includes(userId)) {
      room.members.push(userId);
      await room.save();
    }
    res.json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// controllers/authController.js
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    // Logic to handle password reset, such as sending a reset link to the user's email
    res.status(200).json({ message: 'Password reset email sent' });
};

// Send Direct Message
exports.sendDirectMessage = async (req, res) => {
    const { recipientId, content, isVoiceMessage } = req.body;

    if (!recipientId || !content) {
        return res.status(400).json({ msg: 'Recipient ID and content are required' });
    }

    try {
        const message = new Message({
            sender: req.user.id,
            recipient: recipientId,
            content,
            isVoiceMessage,
        });

        await message.save();
        res.json(message);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Add Reaction to Message
exports.addReaction = async (req, res) => {
    try {
        const message = await Message.findById(req.params.messageId);
        if (!message.reactions) {
            message.reactions = {};
        }
        message.reactions[req.body.reaction] = (message.reactions[req.body.reaction] || 0) + 1;
        await message.save();
        res.status(200).json(message);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

