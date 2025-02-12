const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    avatar: String,
    settings: {
        chatBubble: { type: String, default: 'rounded' },
        colorScheme: { type: String, default: '#2196F3' },
        bubbleColor: { type: String, default: '#ffffff' }
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});