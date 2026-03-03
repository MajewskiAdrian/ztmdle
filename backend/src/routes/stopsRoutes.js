const express = require('express');
const router = express.Router();
const stopsController = require('../controllers/stopsController');

router.get('/', stopsController.getRandomStops);

module.exports = router;