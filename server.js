// Configuring the app server
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

// Configuring the database
const dbConfig = require('./configuration/mongo-db-config.js');
const mongoose = require('mongoose');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())

// Running the app server
app.get('/', (req, res) => {
    res.send('Route-opt, from express!');
});

// Require Store routes (It must be right before app.listen)
require('./endpoints/storeEndpoints.js')(app);
app.listen(port, () => console.log(`Route-opt listening on port ${port}!`))

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log(`Successfully connected to the database`);
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

