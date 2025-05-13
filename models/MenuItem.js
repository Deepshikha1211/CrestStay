const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
