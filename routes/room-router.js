const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room-controller');

router.get('', roomController.getAll);
router.post('', roomController.save);
router.put('/:id', roomController.put);
router.patch('/:id', roomController.patch);
router.get('/available', roomController.getAvailable);

module.exports = router;
