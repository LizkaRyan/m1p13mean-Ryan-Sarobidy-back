const mongoose = require('mongoose');
const notificationSchema = require('./notificationSchema');
const roleSchema = require('./roleSchema');
const favoriteSchema = require('./favoriteSchema');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  role: roleSchema,
  favorites: [favoriteSchema],
  notifications: [notificationSchema]
});

module.exports = mongoose.model('User', userSchema);
