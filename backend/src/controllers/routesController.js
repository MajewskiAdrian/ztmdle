const db = require('../config/dbconnection');

exports.getRoutesFromStop = (req, res) => {
    try {
        const routesFromStop = db.prepare(`
            SELECT stopsintrip.routeId, stopsintrip.tripId
            FROM stopsintrip 
            INNER JOIN stops ON stopsintrip.stopId=stops.stopId
            INNER JOIN trips ON stopsintrip.routeId=trips.routeId AND stopsintrip.tripId=trips.tripId
            WHERE stopsintrip.stopId = ? AND trips.type='MAIN';
            `).all(req.params.stopId);

        res.json(routesFromStop);
    } catch (err) {
        res.status(500)
        res.json({message: "Błąd bazy danych", error: err.message })
    }
        
    
}