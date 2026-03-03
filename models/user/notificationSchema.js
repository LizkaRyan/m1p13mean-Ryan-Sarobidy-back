const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type: {
    code: String,
    label: String
  },
  payload: mongoose.Schema.Types.Mixed,
  message: String,
  createdAt: Date,
  read: Boolean
});

module.exports = notificationSchema;