const NewsModel = require('../models/News');
 

// Fetch Trending News (Using Aggregation Pipeline)
const fetchTrendingNews = async (req, res) => {
  try {
    const trendingNews = await NewsModel.aggregate([
      { $sort: { timestamp: -1 } },
      { $limit: 10 },
    ]);
    res.json(trendingNews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add News (For Testing)
const addNews = async (req, res) => {
  const { title, content, category } = req.body;
  const news = new NewsModel({ title, content, category });

  try {
    const savedNews = await news.save();
    res.status(201).json(savedNews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { fetchTrendingNews, addNews };