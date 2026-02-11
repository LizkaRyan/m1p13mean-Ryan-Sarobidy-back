const express = require('express');
const router = express.Router();
const requestReservationController = require('../controllers/request-reseservation-controller');

router.get('', requestReservationController.findAll);

module.exports = router;
