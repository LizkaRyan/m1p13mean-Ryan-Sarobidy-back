const mongoose = require('mongoose');
const { productPhotoSchema } = require("./productPhoto"); 

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    unityPrice: {
        type: Number,
        required: true
    },
    category: {
        code: String,
        label: String
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop", 
        required: true
    },
    description: String,
    status: {
        code: String,
        label: String
    },
    photos: [productPhotoSchema]
});

module.exports = mongoose.model('Product', productSchema);