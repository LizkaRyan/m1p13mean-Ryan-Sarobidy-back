const express = require('express');
const router = express.Router();
const requestEventController = require('../controllers/request-event-controller');

router.get('', requestEventController.findAll);
router.get('/with-event', requestEventController.findWithEvent);
router.patch('/:id', requestEventController.patch);
router.post('', requestEventController.postRequestEvent);

module.exports = router;
