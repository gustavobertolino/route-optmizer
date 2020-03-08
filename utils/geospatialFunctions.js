exports.distanceBetweenTwoCoordinatesInKm = (object1, object2) => {
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