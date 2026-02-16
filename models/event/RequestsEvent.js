const mongoose = require('mongoose');
const statusRequestEventSchema = require('./statusRequestEventSchema');

const requestsEventSchema = new mongoose.Schema({
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop", // nom du model
        required: true
    },
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
    status: statusRequestEventSchema
});

module.exports = mongoose.model('RequestsEvent', requestsEventSchema, 'requestsEvent');
