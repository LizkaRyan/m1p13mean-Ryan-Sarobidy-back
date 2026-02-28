const mongoose = require('mongoose');
const notificationSchema = require('./notificationSchema');
const roleSchema = require('./roleSchema');
const favoriteSchema = require('./favoriteSchema');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  name: String,
  role: roleSchema,
  favorites: [favoriteSchema],
  notifications: [notificationSchema]
});

userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.pre('findOneAndUpdate', async function() {
  const update = this.getUpdate();

  if (update.$set && update.$set.password) {
    const salt = await bcrypt.genSalt(10);
    update.$set.password = await bcrypt.hash(update.$set.password, salt);
  }

  if (update.password) {
    const salt = await bcrypt.genSalt(10);
    update.password = await bcrypt.hash(update.password, salt);
  }
});

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
