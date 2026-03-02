const express = require('express');
const router = express.Router();
const requestReservationController = require('../controllers/request-reservation-controller');

router.get('', requestReservationController.findAll);
router.patch('/:id', requestReservationController.patch);
router.post('/create', requestReservationController.create);

module.exports = router;
