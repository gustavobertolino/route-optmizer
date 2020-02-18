const Store = require('../model/Store.js');
const Promise = require('bluebird');

export default class StoreService {

    async createStore(storeDto) {
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
}