// routes/giphyRoutes.js
const express = require('express');
const giphy = require('giphy-js-sdk-core');
const GIPHY_API_KEY = process.env.GIPHY_API_KEY;
const client = giphy(GIPHY_API_KEY);
const router = express.Router();

// Search for GIFs
router.get('/search', async (req, res) => {
    const { q } = req.query;
    try {
        const response = await client.search('gifs', { q, limit: 10 });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch GIFs' });
    }
});

module.exports = router;