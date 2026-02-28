const express = require('express');
const router = express.Router();
const ShopController = require('../controllers/shop-controller');

router.get('/available', ShopController.getAllDisponibles);
router.get('/:id', ShopController.getById); 

module.exports = router;
