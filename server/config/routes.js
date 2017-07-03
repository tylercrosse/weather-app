const express = require('express');
const forecastCtlr = require('../controllers/forecast');
const isomorphicCtlr = require('../controllers/isomorphic');

const router = express.Router();

router.get('/api/forecast/:latlng', forecastCtlr.getForecast);
router.get('/*', isomorphicCtlr.serveIndex);

module.exports = router;
