const db = require('../config/dbconnection');

exports.getRoutes = (req, res) => {
    try {
        const routesFromStop = db.prepare(`SELECT * FROM stopsintrip WHERE stopId = ${req.params.stopId};`).all();
        res.json(routesFromStop);
    } catch (err) {
        res.status(400);
        res.json({message: "Błąd zapytania", err});
    }
}