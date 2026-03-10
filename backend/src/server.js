const express = require('express')
const app = express()
const port = 3000
app.use(express.json());

const stopsRoute = require('./routes/stops');
app.use('/stops', stopsRoute);

const routesFromStop = require('./routes/routesFromStop');
app.use('/routesfromstop/:stopId', routesFromStop);

// const routesData = require('./routes/routesData');
// app.use('/routesdata', routesData);

const stopsFromRoute = require('./routes/stopsFromRoute');
app.use('/stopsfromroute/:routeId/:tripId', stopsFromRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
