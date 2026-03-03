const Review = require('../models/shop/Review');
const { reviewValidator } = require('../validators/review-validator');
const Shop = require('../models/shop/Shop'); 

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

const findByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        // 1. Récupérer tous les shopId de cet utilisateur
        const shops = await Shop.find({ userId }).select('_id');

        if (!shops.length) {
            return res.json([]);
        }

        const shopIds = shops.map(s => s._id);

        // 2. Récupérer toutes les reviews de ces shops
        const reviews = await Review.find({ shopId: { $in: shopIds } })
            .populate({ path: "userId", select: "name email" })
            .populate({ path: "shopId", select: "name" }); 

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { findByShopId, postReview, findByUserId };