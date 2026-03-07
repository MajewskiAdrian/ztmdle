const express = require('express')
const app = express()
const port = 3000
app.use(express.json());

const stopsRoute = require('./routes/stops');
app.use('/stops', stopsRoute);

const routesFromStop = require('./routes/routesFromStop');
app.use('/routesfromstop/:stopId', routesFromStop);

const routesData = require('./routes/routesData');
app.use('/routesdata', routesData);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
