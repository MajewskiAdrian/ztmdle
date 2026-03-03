const express = require('express');
const router = express.Router({mergeParams: true}); ///dsadsaAAAAAAAAAAAAAAAAAA
const routesController = require('../controllers/routesController');

router.post('/', routesController.getRoutesData);

module.exports = router;