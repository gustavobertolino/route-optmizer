const mongoose = require('mongoose');

const LegSchema = mongoose.Schema({
    origin: Number,
    destination: Number,
    distance: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Leg', LegSchema);