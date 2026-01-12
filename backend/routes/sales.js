const express = require('express');
const router = express.Router();
const { recordSale, paymentCallback } = require('../controllers/salesController');

router.post('/', recordSale);
router.post('/payment-callback', paymentCallback);

module.exports = router;
