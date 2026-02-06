const mongoose = require('mongoose');

const statusRoomSchema = new mongoose.Schema({
  code: String,
  label: String
});

module.exports = statusRoomSchema;