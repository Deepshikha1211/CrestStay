const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  date: String,
  author: String,
  title: String,
  description: String,
  image: String
});

module.exports = mongoose.model('News', newsSchema);
