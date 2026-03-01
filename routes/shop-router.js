const express = require('express');
const router = express.Router();
const { getAllShops, getShop, save, put, patch } = require('../controllers/shop-controller');

router.get('/available', ShopController.getAllDisponibles);
router.get('/:id', ShopController.getById);
router.get('/user/:userId', ShopController.getByUserId); 

module.exports = router;