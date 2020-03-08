const RouteService = require('../service/RouteService.js')

exports.createRoutes = async (req, res) => {
    await RouteService.createRoute()
        .then(response => {res.send(response);})
        .catch(error => {res.status(500).send({
            message: error.message || "Some error occurred while creating the routes."});
    });
}