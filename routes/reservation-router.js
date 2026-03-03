const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation-controller');
const { authorizeRole } = require('../middlewares/authMiddleware');

router.get('/stats', authorizeRole('ADMIN'), reservationController.getStatisticPaidAndUnpaid);
router.get('/unpaid', authorizeRole('ADMIN'), reservationController.getShopUnpaid);
router.patch('/payment/:paymentId',authorizeRole('ADMIN'), reservationController.pay);

module.exports = router;