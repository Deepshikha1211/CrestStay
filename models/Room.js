const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: String,
  image: String
});

module.exports = mongoose.model('Room', roomSchema);
