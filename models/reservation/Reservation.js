const mongoose = require('mongoose');
const paymentHistorySchema = require('./paymentHistorySchema');

const reservationSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    paymentHistory: [paymentHistorySchema],
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop", // nom du model
        required: true
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room", // nom du model
        required: true
    },
});

module.exports = mongoose.model('Reservation', reservationSchema);
