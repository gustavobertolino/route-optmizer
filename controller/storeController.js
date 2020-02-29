const Store = require('../model/Store.js');
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
exports.findOne = (req, res) => {
    Store.findById(req.params.id)
    .then(store => {
        if(!store) {
            return res.status(404).send({
                message: "Store not found with id " + req.params.id
            });            
        }
        res.send(store);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Store not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving store with id " + req.params.id
        });
    });
};

// Update a store identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name || !req.body.latitude || !req.body.longitude) {
        return res.status(400).send({
            message: "Store name or coordinates cannot be empty"
        });
    }

    // Find store and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    }, {new: true})
    .then(store => {
        if(!store) {
            return res.status(404).send({
                message: "Store not found with id " + req.params.id
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Store not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating store with id " + req.params.id
        });
    });
};
