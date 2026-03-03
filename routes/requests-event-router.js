const express = require('express');
const router = express.Router();
const requestEventController = require('../controllers/request-event-controller');
const { authorizeRole } = require('../middlewares/authMiddleware');

router.get('', authorizeRole('BOUTIQUE','ADMIN'), requestEventController.findAll);
router.get('/with-event', authorizeRole('BOUTIQUE','ADMIN'), requestEventController.findWithEvent);
router.patch('/:id', authorizeRole('BOUTIQUE','ADMIN'), requestEventController.patch);
router.post('', authorizeRole('BOUTIQUE'), requestEventController.postRequestEvent);

module.exports = router;
