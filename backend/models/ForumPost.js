const mongoose = require('mongoose');

const ForumPostSchema = new mongoose.Schema({
  content: { type: String, required: true },
  postedBy: { type: String, default: 'Anonymous' }, // track or default
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ForumPost', ForumPostSchema);
