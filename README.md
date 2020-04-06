# route-optmizer
Routing vehicle application to find best routes to any store's orders. The application construct a solution with routes built from available store's orders. 

The most important endpoint is to **create routes solution**

The strategy used is called **Push Forward**, in which each order is picked up from available orders to initiates a new route. Then the solution loops through orders to find someone that presents harmony in terms of distance to the order initially inserted in the route.

![vrp-image](vehicle-routing-problem-image.png)

The application is construed in node.js. So you need to have npm and node.js installed in your machine (latest versions are recommended).

To run and use the application:

1. clone the project to your machine --> https://github.com/gustavobertolino/route-optmizer.git

2. in the root repository of the project, run the command npm start.

3. call the endpoint you want following the instructions of each endpoint as follows

https://documenter.getpostman.com/view/5181760/SzYbzHu2


