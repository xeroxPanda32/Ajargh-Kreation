const Review = require('../model/review');
const mongoose = require('mongoose');

// Controller to get reviews for a specific listing
const getReviews = async (req, res) => {
    const { listingId } = req.params;
    console.log("kjhh",listingId)
    try {
        const reviews = await Review.find({ listing: listingId });
        res.status(200).json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Controller to create a new review for a listing
const createReview = async (req, res) => {
    const listingId = req.params.listingId; 
    console.log(listingId);
    const { rate, comment } = req.body;

    try {
        const newReview = new Review({
            rate: rate,
            comment: comment,
            listing: listingId
        });

        const savedReview = await newReview.save();
        res.status(201).json({ message: "Review created successfully", review: savedReview });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Controller to update an existing review for a listing
const updateReview = async (req, res) => {
    const { id } = req.params;
    const { rate, comment, reply } = req.body;

    try {
        const review = await Review.findOne({ _id: id });
        if (!review) {
            return res.status(404).json({ error: "Review not found for the specified id" });
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
};

// Controller to delete a review for a listing
const deleteReview = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedReview = await Review.findOneAndDelete({ _id: id });
        if (!deletedReview) {
            return res.status(404).json({ error: "Review not found for the specified listing" });
        }
        res.status(200).json({ message: "Review deleted successfully", review: deletedReview });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Controller to add a response to a review for a listing
const respondToReview = async (req, res) => {
    const { listingId, id } = req.params;
    const { reply } = req.body;

    try {
        const review = await Review.findOne({ _id: id, listing: listingId });
        if (!review) {
            return res.status(404).json({ error: "Review not found for the specified listing" });
        }

        review.reply = reply;

        const updatedReview = await review.save();
        res.status(200).json({ message: "Response added successfully", review: updatedReview });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getReviews,
    createReview,
    updateReview,
    deleteReview,
    respondToReview
};

