const express = require('express');
const router = express.Router();
const requestEventController = require('../controllers/request-event-controller');

router.get('', requestEventController.findAll);
router.get('/with-event', requestEventController.findWithEvent);

module.exports = router;
