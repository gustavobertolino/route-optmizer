const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    orderId: String,
    storeId: String,
    customerId: String,
    routeId: String,
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