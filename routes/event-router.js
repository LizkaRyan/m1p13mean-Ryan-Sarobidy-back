const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event-controller');

router.get('/', eventController.getAllEvents);
router.post('/', eventController.save);

module.exports = router;
