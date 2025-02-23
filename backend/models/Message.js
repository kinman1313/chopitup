const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isVoiceMessage: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reactions: {
    type: Map,
    of: Number,
    default: {},
  },
});

module.exports = mongoose.model('Message', MessageSchema);
