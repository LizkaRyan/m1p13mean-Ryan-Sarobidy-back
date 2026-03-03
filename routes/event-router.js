const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event-controller');
const { authorizeRole } = require('../middlewares/authMiddleware');

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.post('/', authorizeRole('ADMIN'), eventController.save);
router.patch('/:id', authorizeRole('ADMIN'), eventController.patch);

module.exports = router;
