const mongoose = require('mongoose');

const RouteSchema = mongoose.Schema({
    orders: Array,
    legs: Array,
    firstLeg: Object,
    origin: Number,
    destination: Number,
    distance: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Route', RouteSchema);