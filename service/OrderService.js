const Order = require('../model/Order.js');

exports.createNewOrder = async (orderDto) => {
    const newOrder = new Order({
        orderId: orderDto.orderId,
        storeId: orderDto.storeId,
        customerId: orderDto.customerId,
        latitude: orderDto.latitude,
        longitude: orderDto.longitude,
        pickUpTime: orderDto.pickUpTime,
        deliveryTime: orderDto.deliveryTime,
        isPreparing: orderDto.isPreparing,
        isAvailableToRoute: orderDto.isAvailableToRoute
    });

    await newOrder.save()
        .then(data => {return {success: true, result: data};})
        .catch(error => {return {success: false, result: error};
    });
}

exports.findOrderById = async (orderId) => {
    try {
        var result = await Order.findById(orderId);
        return {success: true, result: result};
    } catch (error) {
        throw new Error(error);
    }
}

exports.findAllOrders = async () => {
    try {
        var result = await Order.find();
        return {success: true, result: result};
    } catch(error) {
        return {success: false, result: error};
    }
}

exports.updateOrder = async (orderId, orderDto) => {
    try {
        var result = await Order.findByIdAndUpdate(orderId, orderDto, {new: true});
        return {success: true, result: result};
    } catch(error) {
        throw new Error(error);   
    }
}