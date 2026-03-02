const Review = require('../models/shop/Review');
const { reviewValidator } = require('../validators/review-validator');

const findByShopId = async (req, res) => {
    try {
        const { id } = req.params;
        const reviews = await Review.find({ shopId: id }).populate({
            path: "userId",
            select: "name email"
        });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const postReview = async (req, res) => {
    try {
        const { id } = req.params;
        const data = { ...req.body, shopId: id };
        await reviewValidator.validate(data);
        const review = new Review(data);
        review.createdAt = new Date();
        const savedReview = await review.save();
        await savedReview.populate({
            path: "userId",
            select: "name email"
        });
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { findByShopId, postReview };