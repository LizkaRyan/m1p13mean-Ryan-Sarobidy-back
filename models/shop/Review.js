const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop", 
        required: true
    },
    rating: Number,
    text: String,
    createdAt: Date,
});

module.exports = mongoose.model('Review', reviewSchema);
