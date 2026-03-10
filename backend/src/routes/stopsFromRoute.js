const express = require('express');
const router = express.Router({mergeParams: true});
const stopsController = require('../controllers/stopsController');

router.get('/', stopsController.getStopsFromRoute);

module.exports = router;