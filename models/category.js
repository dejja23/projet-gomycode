const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = Schema({
  manufacturer: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('Category', CategorySchema);
