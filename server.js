const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Route-opt, from express');
});

app.listen(port, () => console.log(`Route-opt listening on port ${port}!`))

