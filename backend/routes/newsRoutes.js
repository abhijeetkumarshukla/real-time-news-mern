const express = require('express');
const router = express.Router();
const { fetchTrendingNews, addNews } = require('../controllers/newsController');

// Fetch Trending News
router.get('/trending', fetchTrendingNews);

// Add News (For Testing)
router.post('/create', addNews);

module.exports = router;