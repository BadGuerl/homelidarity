const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const keyWordsSchema = new Schema({
  word: {
    type: String,
    unique: true,
    required: true
  },
  value: {
    type: number,
    enum: [1, 2, 3]
  }
});

const keyWords = mongoose.model('keyWords', keyWordsSchema);
module.exports = keyWords;