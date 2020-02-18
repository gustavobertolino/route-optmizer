module.exports = (app) => {
    const store = require('../controller/storeController.js');

    // Create a new Store
    app.post('/stores', store.create);

    // Retrieve a single Store with noteId
    app.get('/stores/:id', store.findOne);

    // Update a Store with id
    app.put('/stores/:id', store.update);
}