const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation-controller');

router.get('/stats', reservationController.getStatisticPaidAndUnpaid);
router.get('/unpaid',reservationController.getShopUnpaid);

module.exports = router;