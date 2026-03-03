const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room-controller');
const { authorizeRole } = require('../middlewares/authMiddleware');

router.get('', roomController.getAll);
router.post('', authorizeRole('ADMIN'), roomController.save);
router.put('/:id', authorizeRole('ADMIN'), roomController.put);
router.patch('/:id', authorizeRole('ADMIN'), roomController.patch);
router.get('/available', roomController.getAvailable);

module.exports = router;
