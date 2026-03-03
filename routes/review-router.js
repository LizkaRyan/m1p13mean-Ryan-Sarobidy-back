const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review-controller');
const { authorizeRole } = require('../middlewares/authMiddleware');

router.get('/user/:userId', authorizeRole('BOUTIQUE'),reviewController.findByUserId);

module.exports = router;