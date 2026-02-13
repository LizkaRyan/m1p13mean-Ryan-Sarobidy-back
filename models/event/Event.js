const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    title: String,
    startDate: Date,
    endDate: Date,
    description: String,
    themes: [String],
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: false,
        default: null
    },
    color: String,
    deletedAt: {type: Date, default: null}
});

module.exports = mongoose.model('Event', eventSchema);
