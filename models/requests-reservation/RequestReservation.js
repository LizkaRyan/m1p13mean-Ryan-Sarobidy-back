const mongoose = require('mongoose');
const { Shop } = require("../shop/Shop");
const { Room } = require("../room/Room");


const requestsReservationSchema = new mongoose.Schema({
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
    beginingDate: Date,
    endingDate: Date,
    validated: { type: Boolean, default: null }
});

module.exports = mongoose.model('RequestsReservation', requestsReservationSchema, 'requestsReservation');
