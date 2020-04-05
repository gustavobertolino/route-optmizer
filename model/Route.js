const mongoose = require('mongoose');

const RouteSchema = mongoose.Schema({
    routes: Map,
}, {
    timestamps: true
});

module.exports = mongoose.model('Route', RouteSchema);