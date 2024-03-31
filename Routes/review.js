const express = require('express');
const router = express.Router();
const Review = require('../model/review');

// Route to create a new review
router.post('/reviews', async (req, res) => {
    const { rate, comment } = req.body;
    const newReview = new Review({
        rate: rate,
        comment: comment,
        reply: ''
    });

    try {
        const savedReview = await newReview.save();
        res.status(201).json({ message: "Review created successfully", review: savedReview });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Route to update a review
router.put('/reviews/:id', async (req, res) => {
    const id = req.params.id;
    const { rate, comment, reply } = req.body;

    try {
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        review.rate = rate;
        review.comment = comment;
        review.reply = reply;

        const updatedReview = await review.save();
        res.status(200).json({ message: "Review updated successfully", review: updatedReview });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Route to delete a review
router.delete('/reviews/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deletedReview = await Review.findByIdAndDelete(id);
        if (!deletedReview) {
            return res.status(404).json({ error: "Review not found" });
        }
        res.status(200).json({ message: "Review deleted successfully", review: deletedReview });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Route for business owners to respond to reviews
router.put('/reviews/respond/:id', async (req, res) => {
    const id = req.params.id;
    const { reply } = req.body;

    try {
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        review.reply = reply;

        const updatedReview = await review.save();
        res.status(200).json({ message: "Response added successfully", review: updatedReview });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
