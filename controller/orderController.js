const OrderService = require('../service/OrderService.js');

// Create and save a new Order
exports.create = async (req, res) => {
    // Validate request
    if(!req.body.storeId || !req.body.latitude || !req.body.longitude || !req.body.pickUpTime
        || !req.body.deliveryTime || req.body.isPreparing == true 
        || req.body.isAvailableToRoute == false) {
        return res.status(400).send({
            message: "Order infos cannot be empty"
        });
    }

    const orderDto = req.body;
    await OrderService.createNewOrder(orderDto)
        .then(response => {res.send(response);})
        .catch(error => {res.status(500).send({
            message: error.message || "Some error occurred while creating the Store."});
    });
};

// Find a single order with an id
exports.findOne = async (req, res) => {
    const orderId = req.params.id
    await OrderService.findOrderById(orderId)
    .then(response => {
        if(!response) {
            return res.status(404).send({
                message: "Order not found with id " + orderId
            });            
        }
        return res.send(response);
    }).catch(error => {
        if(error.message.includes('ObjectId')) {
            res.status(404).send({
                message: "Order not found with id " + orderId
            });                
        }
        res.status(500).send({
            message: "Order retrieving order with id " + orderId
        });
    });
};

exports.findAll = async (req, res) => {
    try {
        var response = await OrderService.findAllOrders();
        return res.send(response);
    } catch(error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving orders."
        });
    }
};

// Update a order identified by the id in the request
exports.update = async (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Order infos cannot be empty"
        });
    }

    const orderId = req.params.id;
    const orderDto = req.body;
    // Find store and update it with the request body
    await OrderService.updateOrder(orderId, orderDto)
    .then(response => {
        if (!response) {
            return res.status(404).send({
                message: "Order not found with id " + orderId
            });
        }
        res.send(response);
    }).catch(error => {
        if(error.message.includes('ObjectId')) {
            return res.status(404).send({
                message: "Order not found with id " + orderId
            });                
        }
        return res.status(500).send({
            message: "Server error updating order with id " + orderId
        });
    });
};
