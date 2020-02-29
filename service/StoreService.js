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