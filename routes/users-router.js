var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user-controller');

/* GET users listing. */
router.patch('/:id', UserController.patch);
router.post('/:id/notifications', UserController.postNotification);

module.exports = router;
