const mongoose = require('mongoose');
const dimensionSchema = require('./dimensionSchema');
const statusRoomSchema = require('./statusRoomSchema');

const roomSchema = new mongoose.Schema({
    name: String,
    rentPrice: Number,
    status: statusRoomSchema,
    floor: Number,
    capacity: Number,
    dimensions: dimensionSchema,
});

roomSchema.pre('save', async function () {
    if (!this.isModified('dimensions.length') || !this.isModified('dimensions.height')) return;
    this.dimensions.area = this.dimensions.length * this.dimensions.width;
});

roomSchema.pre('findOneAndUpdate', async function () {
    const update = this.getUpdate();

    if (update.$set && (update.$set.dimensions.length || update.$set.dimensions.height)) {
        update.$set.dimensions.area = update.$set.dimensions.length * update.$set.dimensions.width;
    }

    if (update.dimensions.length || update.dimensions.height) {
        update.dimensions.area = update.dimensions.length * update.dimensions.width;
    }
});

module.exports = mongoose.model('Room', roomSchema);
