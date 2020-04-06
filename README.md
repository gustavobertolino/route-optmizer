# route-optmizer
Routing vehicle application to find best routes to any store's orders. The application construct a solution with routes built from available store's orders. 

The most important endpoint is to **create routes solution**

The strategy used is called **Push Forward**, in which each order is picked up from available orders to initiates a new route. Then the solution loops through orders to find someone that presents harmony in terms of distance to the order initially inserted in the route.

![vrp-image](vehicle-routing-problem-image.png)

The application is construed using node.js + mongoDB. So you need to have npm | node.js installed in your machine (latest versions are recommended) and mongoDB as well.

For npm | node.js, just follow this tutorial
https://www.devroom.io/2011/10/24/installing-node-js-and-npm-on-ubuntu-debian/

For mongoDB & Robot3T (mongoDB client), follow these ones
https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-18-04
https://www.techrunnr.com/install-robomongo-robo-3t-on-ubuntu-18-04/


To run and use the application:

1. clone the project to your machine --> https://github.com/gustavobertolino/route-optmizer.git

2. in the root repository of the project, run the command npm start.

3. call the endpoint you want on localhost:3000 following the instructions of each endpoint as follows

https://documenter.getpostman.com/view/5181760/SzYbzHu2


