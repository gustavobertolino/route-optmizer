module.exports = (app) => {
    const route = require('../controller/routeController.js');

     // Create a new Route
     app.get('/routes', route.createRoutes);
}