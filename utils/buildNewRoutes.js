var createRoute = (availableOrders) => {
    availableOrders.sort(compare);
    var routesToDeliver = [];
    var orderAlreadyRouted = new Set();
    const limitToEachRoute = 3;

    availableOrders.forEach(mostUrgentOrderToDeliver => {
        var eachRoute = [];
        if (!orderAlreadyRouted.has(mostUrgentOrderToDeliver)) {
            eachRoute.push(mostUrgentOrderToDeliver);
            orderAlreadyRouted.add(mostUrgentOrderToDeliver);
        }

        availableOrders.forEach(order => {
        var distanceToOrder = distanceBetweenTwoCoordinatesInKm(mostUrgentOrderToDeliver, order);
        console.log("Distance (KM) from Most-Urgent-Order to n Order ", distanceToOrder);
        var distanceToStore = mostUrgentOrderToDeliver.distanceToStore;
        console.log("Distance (KM) from Most-Urgent-Order to Store ", distanceToStore);
        
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

var compare = (o1, o2) => {
    let comparasion = 0;
    if (o1.deliveryTime < o2.deliveryTime) {
        comparasion = -1;
    } else if (o1.deliveryTime > o2.deliveryTime) {
        comparasion = 1;
    }
    return comparasion;
};

var distanceBetweenTwoCoordinatesInKm = (object1, object2) => {
    var latitudeObject1 = object1.latitude;
    var latitudeObject2 = object2.latitude;
    var longitudeObject1 = object1.longitude;
    var longitudeObject2 = object2.longitude;

    var piInRadius = 0.017453292519943295;// Math.PI / 180
    var cosenus = Math.cos;
    var haversineFormula = 0.5 - cosenus((latitudeObject2 - latitudeObject1) * piInRadius)  /2 + cosenus(latitudeObject1 * piInRadius) * cosenus(latitudeObject2 * piInRadius)    * (1 - cosenus((longitudeObject2 - longitudeObject1) * piInRadius))/2;
    var result = 12742 * Math.asin(Math.sqrt(haversineFormula)); // 2 * R; R = 6371 km
    return result;
};

var dataSet = [
    {
        id: "1",
        storeId: 123,
        customerId: 321,
        distanceToStore: 1.42,
        latitude: -23.5547971541,
        longitude: -46.6753087445,
        pickUpTime: "2020-02-16 15:15:08.427Z",
        deliveryTime: "2020-02-16 16:15:08.427Z",
        isPreparing: false,
        isAvailableToRoute: true,
        isOnRoute: false,
        isDelivered: false
    }, 
    {
        id: "2",
        storeId: 124,
        customerId: 324,
        distanceToStore: 3.42,
        latitude: -23.5647971541,
        longitude: -46.6753087445,
        pickUpTime: "2020-02-16 15:17:08.427Z",
        deliveryTime: "2020-02-16 16:17:08.427Z",
        isPreparing: false,
        isAvailableToRoute: true,
        isOnRoute: false,
        isDelivered: false
    }, 
    {
        id: "3",
        storeId: 125,
        customerId: 325,
        distanceToStore: 5.42,
        latitude: -23.5847971541,
        longitude: -46.6753087445,
        pickUpTime: "2020-02-16 15:20:08.427Z",
        deliveryTime: "2020-02-16 16:20:08.427Z",
        isPreparing: false,
        isAvailableToRoute: true,
        isOnRoute: false,
        isDelivered: false
    }, 
    {
        id: "4",
        storeId: 126,
        customerId: 326,
        distanceToStore: 8.42,
        latitude: -23.5947971541,
        longitude: -46.6953087445,
        pickUpTime: "2020-02-16 15:26:08.427Z",
        deliveryTime: "2020-02-16 16:26:08.427Z",
        isPreparing: false,
        isAvailableToRoute: true,
        isOnRoute: false,
        isDelivered: false
    },
    {
        id: "5",
        storeId: 127,
        customerId: 327,
        distanceToStore: 8.53,
        latitude: -23.5957971541,
        longitude: -46.6973087445,
        pickUpTime: "2020-02-16 15:28:08.427Z",
        deliveryTime: "2020-02-16 16:28:08.427Z",
        isPreparing: false,
        isAvailableToRoute: true,
        isOnRoute: false,
        isDelivered: false
    },
    {
        id: "6",
        storeId: 128,
        customerId: 328,
        distanceToStore: 2.42,
        latitude: -23.5277971541,
        longitude: -46.6193087445,
        pickUpTime: "2020-02-16 15:29:08.427Z",
        deliveryTime: "2020-02-16 16:29:08.427Z",
        isPreparing: false,
        isAvailableToRoute: true,
        isOnRoute: false,
        isDelivered: false
    },
    {
        id: "7",
        storeId: 129,
        customerId: 329,
        distanceToStore: 2.81,
        latitude: -23.5247971541,
        longitude: -46.6133087445,
        pickUpTime: "2020-02-16 15:28:08.427Z",
        deliveryTime: "2020-02-16 16:27:08.427Z",
        isPreparing: false,
        isAvailableToRoute: true,
        isOnRoute: false,
        isDelivered: false
    }
];

module.exports = 'buildNewRoutes.js';