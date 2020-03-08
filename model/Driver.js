const mongoose = require('mongoose');

const DriverSchema = mongoose.Schema({
    name: String,
    latitude: Number,
    longitude: Number,
    route: Object,
    isAvailable: Boolean,
    isOnRoute: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Driver', DriverSchema);