const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop-controller');

router.get('/available', shopController.getAllDisponibles);
router.get('/:id', shopController.getById);
router.get('/user/:userId', shopController.getByUserId); 

module.exports = router;