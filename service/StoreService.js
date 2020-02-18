const Store = require('../model/Store.js');
const Promise = require('bluebird');

const createNewStore = async (storeDto) => {
    try {
        const newStore = new Store({
            name: storeDto.name,
            latitude: storeDto.latitude,
            longitude: storeDto.longitude
        })
        return await newStore.save();
    } catch (error) {
        throw new Error(error);
    } 
}