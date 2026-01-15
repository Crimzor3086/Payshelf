const express = require('express');
const router = express.Router();
const analytics = require('../comtrollers/analyticsController');

router.get('/summary', analytics.getSummary);
router.get('/daily', analytics.dailySales);
router.get('/top-products', analytics.topProducts);

module.exports = router;
