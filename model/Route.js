const mongoose = require('mongoose');

const RouteSchema = mongoose.Schema({
    routes: Array,
}, {
    timestamps: true
});

module.exports = mongoose.model('Route', RouteSchema);