const mongoose = require('mongoose');
const statusRequestEventSchema = require('./statusRequestEventSchema');

const requestsEventSchema = new mongoose.Schema({
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
    status: statusRequestEventSchema,
    deletedAt: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('RequestsEvent', requestsEventSchema, 'requestsEvent');
