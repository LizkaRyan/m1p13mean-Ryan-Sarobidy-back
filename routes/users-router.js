var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user-controller');

/* GET users listing. */
router.get('/:id/notifications', UserController.getNotifications);
router.patch('/:id', UserController.patch);
router.post('/:id/notifications', UserController.postNotification);
router.patch('/:id/notifications/mark-all-read', UserController.makeItAllRead);
router.get('/:id/notifications/nb-unread', UserController.countUnread);

module.exports = router;
