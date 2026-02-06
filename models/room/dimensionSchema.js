const mongoose = require('mongoose');

const dimensionSchema = new mongoose.Schema({
  length: Number,
  height: Number,
  width: Number,
  area: Number
});

module.exports = dimensionSchema;