const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // User's name
    email: { type: String, required: true }, // User's email (required)
    authLevel: { type: Number, default: 0 }, // Authentication level (0: user, 1: businessOwner, 2: admin)
    password: { type: String, required: true } // User's password (required)
});

// Middleware to hash the password before saving to the database
userSchema.pre('save', async function(next) {
    const user = this;
    // Hash the password using bcrypt with a salt round of 10
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash; // Set the hashed password back to the schema
    next(); // Move to the next middleware
});

// Method to validate the user's password during login
userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    // Compare the provided password with the hashed password in the database
    const compare = await bcrypt.compare(password, user.password);
    return compare; // Return true if passwords match, false otherwise
};

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User; // Export the User model for use in the application
