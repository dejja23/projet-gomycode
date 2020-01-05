const mongoose = require('mongoose');
const comment = require('./comment');
const Schema = mongoose.Schema;
const AnnonceSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  descerption: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    manufacturer: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    }
  },
  price: {
    type: Number,
    require: true
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  Comments: [comment],
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Annonce', AnnonceSchema);
