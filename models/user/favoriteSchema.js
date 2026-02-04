const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  addedAt: { type: Date, default: Date.now }
});

module.exports = favoriteSchema;