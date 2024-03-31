const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rate: { type: String,default: 1},
    comment: { type: String},
    reply: {type: String}
   
  });

const Review= mongoose.model('Review', reviewSchema);

module.exports = Review;