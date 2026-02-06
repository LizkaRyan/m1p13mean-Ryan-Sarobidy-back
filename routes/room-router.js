const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room-controller');

// CREATE ROOM
router.get('', roomController.getAll);
router.post('', roomController.save);

module.exports = router;
