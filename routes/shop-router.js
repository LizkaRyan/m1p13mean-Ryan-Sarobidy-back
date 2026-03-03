const express = require('express');
const router = express.Router();
const ShopController = require('../controllers/shop-controller');
const ReviewController = require('../controllers/review-controller'); 
const upload = require('../middlewares/uploadMiddleware');
const { authorizeRole } = require('../middlewares/authMiddleware');

router.get('/:id/reviews', ReviewController.findByShopId);
router.post('/:id/reviews', ReviewController.postReview);
router.get('/available', ShopController.getAllDisponibles);
router.get('/:id', ShopController.getById);
router.get('/user/:userId', ShopController.getByUserId); 
router.delete('/:id', authorizeRole('BOUTIQUE'), ShopController.deleteById);
router.post('/create' , authorizeRole('BOUTIQUE'), upload.fields([
  { name: 'exteriorPhoto', maxCount: 1 },
  { name: 'interiorPhoto', maxCount: 1 },
  { name: 'diversPhotos', maxCount: 10 }
]), ShopController.save);

router.put('/:id', authorizeRole('BOUTIQUE'), upload.fields([
  { name: 'exteriorPhoto', maxCount: 1 },
  { name: 'interiorPhoto', maxCount: 1 },
  { name: 'diversPhotos', maxCount: 10 }
]), ShopController.updateById);

module.exports = router;
