const mongoose = require('mongoose');

const paymentHistorySchema = new mongoose.Schema({
  month: String,
  amount: Number,
  paidAt: Date,
  status: String
});

module.exports = paymentHistorySchema;