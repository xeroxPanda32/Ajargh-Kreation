const express = require('express');
const router = express.Router();
const passport = require('../config/passport-jwtStrategy');
const {isAdmin} = require('../middleware/middleware');
const {isBusinessOwner} = require('../middleware/middleware');
const listingsController = require('../controllers/listingsController')


// Route to get all listings (requires authentication)
router.get('/', passport.authenticate('jwt', { session: false }), listingsController.getListings);

// Route to create listing listings (requires authentication)
router.post('/', passport.authenticate('jwt', { session: false }), isBusinessOwner, listingsController.createListing);

// Route to update a listing (requires authentication)
router.put('/:id', passport.authenticate('jwt', { session: false }), isBusinessOwner, listingsController.updateListing);

// Route to delete a listing (requires authentication and admin role)
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdmin, listingsController.deleteListing);

module.exports = router;
