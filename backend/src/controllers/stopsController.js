db = require('../config/dbconnection');

exports.getRandomStops = (req, res) => {
    try {
        const randomStops = db.prepare('SELECT * FROM stops ORDER BY RANDOM() LIMIT 2').all();
        res.json(randomStops);
    } catch (err) {
        res.status(500)
        res.json({message: "Błąd bazy danych", error: err.message});
    }
};

exports.getStopsFromRoute = (req, res) => {
    try {
        const stopsFromRoute = db.prepare(
            `SELECT stops.stopId, stops.stopCode, stops.stopName, stopsintrip.routeId, stopsintrip.stopSequence 
            FROM stops INNER JOIN stopsintrip ON stops.stopId=stopsintrip.stopId
            WHERE stopsintrip.routeId = '${req.params.routeId}' AND stopsintrip.tripId = '${req.params.tripId}'
            ORDER BY stopSequence`
        ).all();
        
        res.send({stopsFromRoute});
    } catch (err) {
        res.status(500)
        res.json({message: "Błąd bazy danych", error: err.message })
    }
    
}