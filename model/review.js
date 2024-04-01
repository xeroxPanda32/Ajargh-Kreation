const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the review schema
const reviewSchema = new mongoose.Schema({
    rate: { type: String, default: 1 }, // Rating for the review (default value: 1)
    comment: { type: String }, // Comment associated with the review
    reply: { type: String }, // Reply to the review (if any)
    listing: { type: Schema.Types.ObjectId, ref: 'Listing', required: true } // Reference to the associated listing
});

// Create the Review model based on the schema
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review; // Export the Review model for use in the application
