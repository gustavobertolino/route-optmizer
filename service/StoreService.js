const Store = require('../model/Store.js');

exports.createNewStore = async (storeDto) => {
    const newStore = new Store({
        name: storeDto.name,
        latitude: storeDto.latitude,
        longitude: storeDto.longitude
    });

    await newStore.save()
        .then(data => {return {success: true, result: data};})
        .catch(error => {return {success: false, result: error};
    });
}

exports.findStoreById = async (storeId) => {
    try {
        var result = await Store.findById(storeId);
        return {success: true, result: result};
    } catch (error) {
        return {success: false, result: error};
    }
}

exports.findAllStores = async () => {
    try {
        var result = await Store.find();
        return {success: true, result: result};
    } catch(error) {
        return {success: false, result: error};
    }
}

exports.updateStore = async (storeId, storeDto) => {
    try {
        var result = await Store.findByIdAndUpdate(storeId, storeDto, {new: true});
        return {success: true, result: result};
    } catch(error) {
        return {success: false, result: error};
    }
}