const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AnnonceSchema = Schema({
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
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      text: {
        type: String,
        required: true
      },

      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Annonce', AnnonceSchema);
