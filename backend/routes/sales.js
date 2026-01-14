const express = require('express');
const router = express.Router();
const { initiatePayment, paymentCallback } = require('../controllers/salesController');

router.post('/pay', initiatePayment);
router.post('/callback', paymentCallback);

module.exports = router;
