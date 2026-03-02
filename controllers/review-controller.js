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
    try{
        await reviewValidator.validate(req.body);
        const review = new Review(req.body);
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { findByShopId, postReview };