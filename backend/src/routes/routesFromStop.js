const express = require('express');
const router = express.Router({mergeParams: true});
const routesController = require('../controllers/routesController');

router.get('/', routesController.getRoutesFromStop);

module.exports = router;