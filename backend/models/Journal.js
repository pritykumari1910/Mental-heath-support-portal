const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
  entry: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Journal', JournalSchema);
