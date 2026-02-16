const mongoose = require('mongoose');

const statusRequestEventSchema = new mongoose.Schema({
  code: String,
  label: String,
  date: Date,
});

module.exports = statusRequestEventSchema;