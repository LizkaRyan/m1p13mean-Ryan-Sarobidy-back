const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');

// LOGIN
router.post('/login', authController.login);
router.post('/signup', authController.post);

module.exports = router;
