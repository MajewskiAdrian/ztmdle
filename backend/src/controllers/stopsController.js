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
        const stopsFromRoute = db.prepare(`
            SELECT stops.stopId, stops.stopCode, stops.stopName, stops.stopLat, stops.stopLon, stopsintrip.routeId, stopsintrip.stopSequence 
            FROM stops 
            INNER JOIN stopsintrip ON stops.stopId=stopsintrip.stopId
            WHERE stopsintrip.routeId = ? AND stopsintrip.tripId = ?
            ORDER BY stopSequence
            `).all(req.params.routeId, req.params.tripId);
        
        res.send(stopsFromRoute);
    } catch (err) {
        res.status(500)
        res.json({message: "Błąd bazy danych", error: err.message })
    }
    
}

exports.getStopsFromStop = (req, res) => {
    try {
        const stopsFromStop = db.prepare(`
            SELECT DISTINCT s.stopId, s.stopCode, s.stopName
            FROM stops AS s
            INNER JOIN stopsintrip AS st2 ON s.stopId = st2.stopId
            WHERE EXISTS (
                SELECT 1
                FROM stopsintrip AS st1
                WHERE st1.stopId = ?
                  AND st1.routeId = st2.routeId
                  AND st1.tripId = st2.tripId
            )
            AND s.stopId != ?
            ORDER BY s.stopName
        `).all(req.params.stopId, req.params.stopId);

        res.json(stopsFromStop);
    } catch (err) {
        res.status(500)
        res.json({ message: "Błąd bazy danych", error: err.message })
    }
};
