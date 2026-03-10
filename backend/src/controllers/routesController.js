const db = require('../config/dbconnection');

exports.getRoutesFromStop = (req, res) => {
    try {
        const routesFromStop = db.prepare(`SELECT * FROM stopsintrip WHERE stopId = ${req.params.stopId};`).all();
        res.json(routesFromStop);
    } catch (err) {
        res.status(500);
        res.json({ message: "Błąd zapytania", error: err.message });
    }
}

exports.getRoutesData = (req, res) => {
    
    try {
        const routesIDs = req.body.ids;
        if (!Array.isArray(routesIDs) || routesIDs.length === 0) {
            res.status(400)
            res.json({message: "ids musi być array"});
        }

        
        const idsString = routesIDs.map(id => `'${id}'`).join(',');
        const routesData = db.prepare(`SELECT * FROM trips WHERE id IN (${idsString})`).all();
        res.json(routesData);
    } catch (err) {
        res.status(500);
        res.json({message: "Błąd zapytania", error: err.message});
    }
}