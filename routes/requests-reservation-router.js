const express = require('express');
const router = express.Router();
const requestReservationController = require('../controllers/request-reseservation-controller');

router.get('', requestReservationController.findAll);
router.patch('/:id', requestReservationController.patch);


module.exports = router;
