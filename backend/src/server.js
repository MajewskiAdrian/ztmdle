const express = require('express')
const app = express()
const port = 3000
app.use(express.json());

const stopsRoute = require('./routes/stopsRoutes');
app.use('/stops', stopsRoute);

const routesFromStop = require('./routes/routesRoutes');
app.use('/routesfromstop/:stopId', routesFromStop);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
