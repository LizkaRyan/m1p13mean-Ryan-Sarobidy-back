const mongoose = require('mongoose');
const { shopPhotoSchema } = require('./ShopPhoto');

const shopSchema = new mongoose.Schema({
    name: String,
    category: {
        code: String,
        label: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    photos: [shopPhotoSchema] 
});

module.exports = mongoose.model('Shop', shopSchema);