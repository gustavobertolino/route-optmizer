const mongoose = require('mongoose');

const StoreSchema = mongoose.Schema({
    name: String,
    latitude: Number,
    longitude: Number,
    orders: Array
}, {
    timestamps: true
});

module.exports = mongoose.model('Store', StoreSchema);