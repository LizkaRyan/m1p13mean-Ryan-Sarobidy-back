const mongoose = require('mongoose');

const shopPhotoSchema = new mongoose.Schema({
    url: String,
    createdAt: String,
    type: {
        code: String,
        label: String
    }
});

module.exports = { shopPhotoSchema };