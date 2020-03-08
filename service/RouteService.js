const Route = require('../model/Route.js');
const OrderService = require('../service/OrderService.js');
const StoreService = require('../service/StoreService.js')

exports.createRoute = async () => {
    let availableOrders = await OrderService.findAllOrders();
    return buildRoutes(availableOrders.result);
}

var buildRoutes = async (availableOrders) => {
    availableOrders.sort(sortOrdersByDeliveryTime);
    var routesToDeliver = [];
    var orderAlreadyRouted = new Set();
    const limitToEachRoute = 3;
    const resolvedPromise = await Promise.all(availableOrders.map(async mostUrgentOrder => {
        const currentStore = await StoreService.findStoreById(mostUrgentOrder.storeId);
        return currentStore;
    }));
    var store = resolvedPromise[0].result;

    availableOrders.forEach(mostUrgentOrderToDeliver => {
        var eachRoute = [];
        if (!orderAlreadyRouted.has(mostUrgentOrderToDeliver)) {
            eachRoute.push(mostUrgentOrderToDeliver);
            orderAlreadyRouted.add(mostUrgentOrderToDeliver);
        }

        availableOrders.forEach(order => {
        var distanceToOrder = distanceBetweenTwoCoordinatesInKm(mostUrgentOrderToDeliver, order);
        console.log(`Most-Urgent-Order ${mostUrgentOrderToDeliver.orderId} to Order ${order.orderId} --> ${distanceToOrder}KM`);
        var distanceToStore = distanceBetweenTwoCoordinatesInKm(store, mostUrgentOrderToDeliver)
        console.log(`Most-Urgent-Order ${mostUrgentOrderToDeliver.orderId} to Store ${store.name} --> ${distanceToStore}KM`);
        
        if(distanceToOrder < distanceToStore && distanceToOrder != 0 
            && !orderAlreadyRouted.has(order)) {
            if (orderAlreadyRouted.has(mostUrgentOrderToDeliver) 
                && routesToDeliver.length != 0) {
                var routeToAddOrder = routesToDeliver
                    .filter(route => {
                        return route.includes(mostUrgentOrderToDeliver)
                        && route.length < limitToEachRoute});
                if (routeToAddOrder.length > 0) {
                    routeToAddOrder[0].push(order);
                } else {
                    eachRoute.push(order);
                }
            } else {
                eachRoute.push(order);
            }
            orderAlreadyRouted.add(order);
        }
      });
      if (eachRoute.length > 0) {
          routesToDeliver.push(eachRoute);
      }
    });

    console.log("Final routes => ", routesToDeliver.join("\n"));
    return routesToDeliver;
}

var distanceBetweenTwoCoordinatesInKm = (object1, object2) => {
    var latitudeObject1 = object1.latitude;
    var latitudeObject2 = object2.latitude;
    var longitudeObject1 = object1.longitude;
    var longitudeObject2 = object2.longitude;

    var piInRadius = 0.017453292519943295;    // Math.PI / 180
    var cosenus = Math.cos;
    var haversineFormula = 0.5 - cosenus((latitudeObject2 - latitudeObject1) * piInRadius)/2 + 
    cosenus(latitudeObject1 * piInRadius) * cosenus(latitudeObject2 * piInRadius) * 
            (1 - cosenus((longitudeObject2 - longitudeObject1) * piInRadius))/2;
    var result = 12742 * Math.asin(Math.sqrt(haversineFormula)); // 2 * R; R = 6371 km
    return result;
};

var sortOrdersByDeliveryTime = (o1, o2) => {
    let comparasion = 0;
    if (o1.deliveryTime < o2.deliveryTime) {
        comparasion = -1;
    } else if (o1.deliveryTime > o2.deliveryTime) {
        comparasion = 1;
    }
    return comparasion;
};