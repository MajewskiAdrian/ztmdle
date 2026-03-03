db = require('../config/dbconnection');

exports.getRandomStops = (req, res) => {
    try {
        const randomStops = db.prepare('SELECT * FROM stops ORDER BY RANDOM() LIMIT 2').all();
        res.json(randomStops);
    } catch (err) {
        res.status(500)
        res.json({message: "Błąd bazy danych", error: err});
    }
};