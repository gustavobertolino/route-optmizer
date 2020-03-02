module.exports = (app) => {
    const route = require('../utils/buildNewRoutes.js');

     // Create a new Route
     app.get('/routes', route.createRoute);
}