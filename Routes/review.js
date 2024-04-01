const express = require('express');
const router = express.Router();
const passport = require('../config/passport-jwtStrategy');
const {isNotBusinessOwner} = require('../middleware/middleware');
const reviewsController = require('../controllers/reviewsController');

// Route to get all reviews (requires authentication)
router.get('/:listingId', passport.authenticate('jwt', { session: false }), reviewsController.getReviews);

// Route to create a new review (requires authentication and not business owner)
router.post('/:listingId', passport.authenticate('jwt', { session: false }), isNotBusinessOwner, reviewsController.createReview);

// Route to update a review by its ID (requires authentication)
router.put('/:id', passport.authenticate('jwt', { session: false }), reviewsController.updateReview);

// Route to delete a review by its ID (requires authentication and not business owner)
router.delete('/:id', passport.authenticate('jwt', { session: false }), isNotBusinessOwner, reviewsController.deleteReview);

// Route to respond to a review by its ID (requires authentication)
router.put('/respond/:listingId/:id', passport.authenticate('jwt', { session: false }), reviewsController.respondToReview);

module.exports = router;

