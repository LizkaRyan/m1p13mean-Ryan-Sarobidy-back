const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  code: { type: String, required: true },
  label: { type: String, required: true }
});

module.exports = roleSchema;