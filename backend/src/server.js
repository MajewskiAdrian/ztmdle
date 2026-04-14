const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
app.use(cors())
app.use(express.json());

const stopsRoute = require('./routes/stops');
app.use('/stops', stopsRoute);

const routesFromStop = require('./routes/routesFromStop');
app.use('/routesfromstop/:stopId', routesFromStop);

const stopsFromStop = require('./routes/stopsFromStop');
app.use('/stopsfromstop/:stopId', stopsFromStop);

// const routesData = require('./routes/routesData');
// app.use('/routesdata', routesData);

const stopsFromRoute = require('./routes/stopsFromRoute');
app.use('/stopsfromroute/:routeId/:tripId', stopsFromRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
