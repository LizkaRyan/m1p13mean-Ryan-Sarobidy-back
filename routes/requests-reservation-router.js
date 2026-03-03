const express = require('express');
const router = express.Router();
const requestReservationController = require('../controllers/request-reservation-controller');
const { authorizeRole } = require('../middlewares/authMiddleware');

router.get('', authorizeRole('ADMIN','BOUTIQUE'), requestReservationController.findAll);
router.patch('/:id', authorizeRole('BOUTIQUE'), requestReservationController.patch);
router.post('/create', authorizeRole('BOUTIQUE'), requestReservationController.create);

module.exports = router;
