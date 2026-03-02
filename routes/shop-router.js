const express = require('express');
const router = express.Router();
const ShopController = require('../controllers/shop-controller');
const ReviewController = require('../controllers/review-controller'); 

router.get('/:id/reviews', ReviewController.findByShopId);
router.post('/:id/reviews', ReviewController.postReview);
router.get('/available', ShopController.getAllDisponibles);
router.get('/:id', ShopController.getById);
router.get('/user/:userId', ShopController.getByUserId); 
router.post('/create', ShopController.create);
router.put('/:id', ShopController.updateById);
router.delete('/:id', ShopController.deleteById);

module.exports = router;
