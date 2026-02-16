const express = require('express');
const router = express.Router();
const requestEventController = require('../controllers/request-event-controller');

router.get('', requestEventController.findAll);

module.exports = router;
