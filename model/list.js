const mongoose = require('mongoose');

// Define the listing schema
const listingSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the listing (required field)
    businessPhone: { type: String, required: true }, // Business phone number (required field)
    city: { type: String, required: true }, // City where the listing is located (required field)
    address: { type: String, required: true }, // Address of the listing (required field)
    images: [{ type: String }] // Array of image URLs associated with the listing (assuming images are stored as URLs)
});

// Create the Listing model based on the schema
const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing; // Export the Listing model for use in the application

