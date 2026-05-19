db = require('../config/dbconnection');

exports.getRandomStops = (req, res) => {
    try {
        // Dla uproszczenia, wybieramy tylko przystanki z Gdańska (zoneId=1) i znajdujące się na trasach MAIN.
        const randomStops = db.prepare(`
            SELECT DISTINCT s.*
            FROM stops s
            INNER JOIN stopsintrip si ON s.stopId = si.stopId
            INNER JOIN trips t ON si.routeId = t.routeId AND si.tripId = t.tripId
            WHERE s.zoneId = 1 AND t.type = 'MAIN'
            ORDER BY RANDOM()
            LIMIT 2
            `).all();
        res.json(randomStops);
    } catch (err) {
        res.status(500)
        res.json({ message: "Błąd bazy danych", error: err.message });
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
        res.json({ message: "Błąd bazy danych", error: err.message })
    }

}

// Możliwe przystanki do przejścia (na pieszo) max 150m
exports.getStopsFromStop = (req, res) => {
    try {
        const r = 6371000; // promień ziemi w m
        const p = Math.PI / 180;
        const distance = 150; // m

        const marginLat = distance / 111000;
 
        const cosLat = Math.cos(req.params.stopLat * Math.PI / 180);
        const marginLon = distance / (111000 * cosLat);

        const minLat = req.params.stopLat - marginLat;
        const maxLat = req.params.stopLat + marginLat;
        const minLon = req.params.stopLon - marginLon;
        const maxLon = req.params.stopLon + marginLon;

        const stopsFromStop = db.prepare(`
            SELECT stopId, stopCode, stopName, zoneId, stopLat, stopLon, type, round((2 * ${r} * asin(sqrt(A)))) AS distance
            FROM (
                SELECT stopId, stopCode, stopName, zoneId, stopLat, stopLon, type, 
                (0.5 - cos((stopLat - ?) * ${p}) / 2 
                + cos(? * ${p}) * cos(stopLat * ${p}) * (1 - cos((stopLon - ?) * ${p})) / 2) AS A
                FROM stops
                WHERE stopLat BETWEEN ? AND ? 
                AND stopLon BETWEEN ? AND ?  
            ) AS subquery
            WHERE distance <= ${distance} AND distance <> 0
            ORDER BY stopCode
        `).all(
            req.params.stopLat, req.params.stopLat, req.params.stopLon,
            minLat, maxLat, minLon, maxLon 
        );
        res.json(stopsFromStop);
    } catch (err) {
        res.status(500)
        res.json({ message: "Błąd bazy danych", error: err.message })
    }
};
