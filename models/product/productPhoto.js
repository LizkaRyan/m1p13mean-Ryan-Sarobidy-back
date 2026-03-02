const mongoose = require('mongoose');

const productPhotoSchema = new mongoose.Schema({
    url: String,
    createdAt: String,
    type: {
        code: String,
        label: String
    }
});

module.exports = { productPhotoSchema };