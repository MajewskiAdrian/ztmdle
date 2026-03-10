const db = require('../config/dbconnection');

exports.getRoutesFromStop = (req, res) => {
    try {
        const routesFromStop = db.prepare(`
            SELECT stopsintrip.routeId, stopsintrip.tripId
            FROM stopsintrip 
            INNER JOIN stops ON stopsintrip.stopId=stops.stopId
            WHERE stopsintrip.stopId = ${req.params.stopId};
            `).all();

        res.json(routesFromStop);
    } catch (err) {
        res.status(500)
        res.json({message: "Błąd bazy danych", error: err.message })
    }
        
    
}