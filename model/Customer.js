const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    name: String,
    latitude: Number,
    longitude: Number,
    orders: Array
}, {
    timestamps: true
});

module.exports = mongoose.model('Customer', CustomerSchema);