const User = require('../models/User');

// Update User Settings
exports.updateSettings = async (req, res) => {
    const { chatBubble, colorScheme, bubbleColor, avatar } = req.body;

    // Validate input
    if (!chatBubble || !colorScheme || !bubbleColor) {
        return res.status(400).json({ msg: 'All settings fields are required' });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.settings = { chatBubble, colorScheme, bubbleColor };
        if (avatar) user.avatar = avatar;
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get User Profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
