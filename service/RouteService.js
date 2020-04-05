const Route = require('../model/Route.js');
const OrderService = require('../service/OrderService.js');
const StoreService = require('../service/StoreService.js')

exports.createRoute = async () => {
    let availableOrders = await OrderService.findAllOrders();
    availableOrders = availableOrders.result.sort(sortOrdersByDeliveryTime);
    return buildRoutes(availableOrders);
}

var buildRoutes = async (availableOrders) => {
    let routesToDeliver = {};
    let ordersAlreadyRouted = new Set();
    const limitToEachRoute = 3;
    const resolvedPromise = await Promise.all(availableOrders.map(async mostUrgentOrder => {
        const currentStore = await StoreService.findStoreById(mostUrgentOrder.storeId);
        return currentStore;
    }));
    let store = resolvedPromise[0].result;

    availableOrders.forEach(mostUrgentOrder => {
        let eachRoute = [];
        let routeIdGenerator = 0;
        if (!ordersAlreadyRouted.has(mostUrgentOrder)) {
            mostUrgentOrder.routeId = routeIdGenerator;
            eachRoute.push(mostUrgentOrder);
            ordersAlreadyRouted.add(mostUrgentOrder);
        }

        availableOrders.forEach(order => {
            let distanceToOrder = distanceBetweenTwoCoordinatesInKm(mostUrgentOrder, order);
            console.log(`Most-Urgent-Order ${mostUrgentOrder.orderId} to Order ${order.orderId} --> ${distanceToOrder}KM`);
            let distanceToStore = distanceBetweenTwoCoordinatesInKm(store, mostUrgentOrder)
            console.log(`Most-Urgent-Order ${mostUrgentOrder.orderId} to Store ${store.name} --> ${distanceToStore}KM`);
        
            let elegibleOrderToRouting = null;
            if(distanceToOrder < distanceToStore && distanceToOrder != 0 
                && !ordersAlreadyRouted.has(order)) {
                elegibleOrderToRouting = order;
            }
        
            if (ordersAlreadyRouted.has(mostUrgentOrder) && routesToDeliver.length != 0) {
                let routeToAddOrder = routesToDeliver.get(mostUrgentOrder.routeId);
                if (routeToAddOrder.length > 0) {
                    elegibleOrderToRouting.routeId = routeToAddOrder.id;
                    routeToAddOrder.push(elegibleOrderToRouting);
                }
            } else if (eachRoute.length < limitToEachRoute){
                order.routeId = routeIdGenerator;
                eachRoute.push(elegibleOrderToRouting);
            }

            if (elegibleOrderToRouting != null) {
                ordersAlreadyRouted.add(elegibleOrderToRouting);
            }
      });
      if (eachRoute.length > 0) {
          routesToDeliver.set(routeIdGenerator, eachRoute);
          routeIdGenerator += 1;
      }
    });

    console.log("Final routes => ", routesToDeliver.join("\n"));
    return routesToDeliver;
}

var distanceBetweenTwoCoordinatesInKm = (object1, object2) => {
    let latitudeObject1 = object1.latitude;
    let latitudeObject2 = object2.latitude;
    let longitudeObject1 = object1.longitude;
    let longitudeObject2 = object2.longitude;

    let piInRadius = 0.017453292519943295;    // Math.PI / 180
    let cosenus = Math.cos;
    let haversineFormula = 0.5 - cosenus((latitudeObject2 - latitudeObject1) * piInRadius)/2 + 
    cosenus(latitudeObject1 * piInRadius) * cosenus(latitudeObject2 * piInRadius) * 
            (1 - cosenus((longitudeObject2 - longitudeObject1) * piInRadius))/2;
    let result = 12742 * Math.asin(Math.sqrt(haversineFormula)); // 2 * R; R = 6371 km
    return result;
};

let sortOrdersByDeliveryTime = (o1, o2) => {
    let comparasion = 0;
    if (o1.deliveryTime < o2.deliveryTime) {
        comparasion = -1;
    } else if (o1.deliveryTime > o2.deliveryTime) {
        comparasion = 1;
    }
    return comparasion;
};