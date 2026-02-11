const mongoose = require('mongoose');
const { boolean } = require('yup');

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
