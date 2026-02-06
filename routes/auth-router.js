const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');

// LOGIN
router.post('/login', authController.login);

module.exports = router;
