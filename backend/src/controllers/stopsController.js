db = require('../config/dbconnection');

exports.getRandomStops = (req, res) => {
    try {
        // Dla uproszczenia, wybieramy tylko przystanki z Gdańska (zoneId=1).
        const randomStops = db.prepare(`SELECT * FROM stops WHERE zoneId=1 ORDER BY RANDOM() LIMIT 2`).all();
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
        const r = 6371; // promień ziemi w km
        const p = Math.PI / 180;
        const distance = 150; // m

        // Margines dla szerokości (zawsze stały)
        const marginLat = distance / 111000;

        // Margines dla długości (zależny od tego, jak blisko bieguna jesteś)
        // Musimy podzielić marginLat przez cosinus szerokości geograficznej
        const cosLat = Math.cos(req.params.stopLat * Math.PI / 180);
        const marginLon = distance / (111000 * cosLat);

        const minLat = req.params.stopLat - marginLat;
        const maxLat = req.params.stopLat + marginLat;
        const minLon = req.params.stopLon - marginLon;
        const maxLon = req.params.stopLon + marginLon;

        const stopsFromStop = db.prepare(`
            SELECT stopId, stopCode, stopName, zoneId, stopLat, stopLon, type, (2 * ${r} * asin(sqrt(A))) AS distance
            FROM (
                SELECT stopId, stopCode, stopName, zoneId, stopLat, stopLon, type, 
                (0.5 - cos((stopLat - ?) * ${p}) / 2 
                + cos(? * ${p}) * cos(stopLat * ${p}) * (1 - cos((stopLon - ?) * ${p})) / 2) AS A
                FROM stops
                WHERE stopLat BETWEEN ? AND ?  -- SZYBKIE FILTROWANIE
                AND stopLon BETWEEN ? AND ?  -- SZYBKIE FILTROWANIE
            ) AS subquery
            WHERE distance <= ${distance / 1000} AND distance <> 0
            ORDER BY distance
        `).all(
            req.params.stopLat, req.params.stopLat, req.params.stopLon,
            minLat, maxLat, minLon, maxLon // Dodatkowe parametry dla BETWEEN
        );
        res.json(stopsFromStop);
    } catch (err) {
        res.status(500)
        res.json({ message: "Błąd bazy danych", error: err.message })
    }
};
