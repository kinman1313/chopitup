// config/db.js
const mongoose = require('mongoose');
const config = require('../config'); // Assuming you have a config.js file with environment variables

const MONGO_URI = process.env.MONGO_URI || config.mongoUri;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then(() => {
        console.log('MongoDB connection successful');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    });

module.exports = mongoose;
