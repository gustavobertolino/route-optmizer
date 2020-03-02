const StoreService = require('../service/StoreService.js');

// Create and Save a new Store
exports.create = async (req, res) => {
    // Validate request
    if(!req.body.name || !req.body.latitude || !req.body.longitude) {
        return res.status(400).send({
            message: "Store name and coordinates cannot be empty"
        });
    }

    const storeDto = req.body;
    await StoreService.createNewStore(storeDto)
        .then(response => {res.send(response);})
        .catch(error => {res.status(500).send({
            message: error.message || "Some error occurred while creating the Store."});
    });
};

// Find a single store with an id
exports.findOne = async (req, res) => {
    const storeId = req.params.id
    await StoreService.findStoreById(storeId)
    .then(response => {
        if(!response) {
            return res.status(404).send({
                message: "Store not found with id " + storeId
            });            
        }
        return res.send(response);
    }).catch(error => {
        if(error.message.includes('ObjectId')) {
            res.status(404).send({
                message: "Store not found with id " + storeId
            });                
        }
        res.status(500).send({
            message: "Error retrieving store with id " + storeId
        });
    });
};

exports.findAll = async (req, res) => {
    try {
        var response = await StoreService.findAllStores();
        return res.send(response);
    } catch(error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving stores."
        });
    }
};

// Update a store identified by the id in the request
exports.update = async (req, res) => {
    // Validate Request
    if(!req.body.name || !req.body.latitude || !req.body.longitude) {
        return res.status(400).send({
            message: "Store name or coordinates cannot be empty"
        });
    }

    const storeId = req.params.id;
    const storeDto = req.body;
    // Find store and update it with the request body
    await StoreService.updateStore(storeId, storeDto)
    .then(response => {
        if (!response) {
            return res.status(404).send({
                message: "Store not found with id " + storeId
            });
        }
        res.send(response);
    }).catch(error => {
        if(error.message.includes('ObjectId')) {
            return res.status(404).send({
                message: "Store not found with id " + storeId
            });                
        }
        return res.status(500).send({
            message: "Server error updating store with id " + storeId
        });
    });
};
