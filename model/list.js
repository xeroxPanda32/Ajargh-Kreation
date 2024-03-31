const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    businessPhone: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    images: [{ type: String }] // Assuming images are stored as URLs
  });

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
