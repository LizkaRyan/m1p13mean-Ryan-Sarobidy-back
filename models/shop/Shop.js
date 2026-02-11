const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    name: String,
    category: {
        code: String,
        label: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // nom du model
        required: true
    },
});

module.exports = mongoose.model('Shop', shopSchema);
