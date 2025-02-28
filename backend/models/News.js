const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const NewsModel = mongoose.model('News', NewsSchema);

module.exports = NewsModel