const express = require('express');
const router = express.Router({mergeParams: true});
const routesController = require('../controllers/routesController');

router.post('/', routesController.getRoutesData);

module.exports = router;