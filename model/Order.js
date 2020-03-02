const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    storeId: String,
    customerId: String,
    distanceToStore: Number,
    latitude: Number,
    longitude: Number,
    pickUpTime: Date,
    deliveryTime: Date,
    isPreparing: Boolean,
    isAvailableToRoute: Boolean,
    isOnRoute: Boolean,
    isDelivered: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);