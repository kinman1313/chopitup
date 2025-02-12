const Message = require('../models/Message');
const Room = require('../models/Room');

// Create Room
exports.createRoom = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ msg: 'Room name is required' });
    }

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

    if (!roomId || !content) {
        return res.status(400).json({ msg: 'Room ID and content are required' });
    }

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

    if (!roomId) {
        return res.status(400).json({ msg: 'Room ID is required' });
    }

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

    if (!roomId || !userId) {
        return res.status(400).json({ msg: 'Room ID and User ID are required' });
    }

    try {
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ msg: 'Room not found' });
        }

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
