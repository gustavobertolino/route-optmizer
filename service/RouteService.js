const Route = require('../model/Route.js');
const OrderService = require('../service/OrderService.js');
const availableOrders = require('../data-set/available-orders.js');
const distanceBetweenTwoCoordinates = require('../utils/workingFunctions.js');

exports.createRoute = () => {
    availableOrders.sort(compare);
    var eachRoute = [];
    var routesToDeliver = [];
    var orderAlreadyRouted = new Set();

    availableOrders.forEach(mostUrgentOrderToDeliver => {
        eachRoute.push(mostUrgentOrderToDeliver);
        availableOrders.forEach(order => {
            var distanceToOrder = distanceBetweenTwoCoordinates(mostUrgentOrderToDeliver, order);
            var distanceToStore = mostUrgentOrderToDeliver.distanceToStore;
        
            if(distanceToOrder < distanceToStore 
                && !orderAlreadyRouted.has(mostUrgentOrderToDeliver)) {
                eachRoute.push(order);
                orderAlreadyRouted.add(order);
                routesToDeliver.push(eachRoute);
            }
        });
    });

    return routesToDeliver;0
}

var compare = (o1, o2) => {
    let comparasion = 0;
    if (o1.deliveryTime < o2.deliveryTime) {
        comparasion = -1;
    } else if (o1.deliveryTime > o2.deliveryTime) {
        comparasion = 1;
    }
    return comparasion;
};

var printElements = (objectToPrint) => {
    objectToPrint.forEach(element => console.log(element));
};