const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review-controller');

router.get('/user/:userId', reviewController.findByUserId);

module.exports = router;