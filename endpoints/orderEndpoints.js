module.exports = (app) => {
    const store = require('../controller/orderController.js');

    // Create a new Order
    app.post('/orders', store.create);

    // Retrieve a single Order with id
    app.get('/orders/:id', store.findOne);

    // Retrieve all orders
    app.get('/orders', store.findAll);

    // Update a order with id
    app.put('/orders/:id', store.update);
}