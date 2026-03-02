const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', productController.getAllProducts);
router.get('/shop/:shopId', productController.getProductsByShopId);
router.get('/:id', productController.getProductById);
router.patch('/:id', productController.patch);
router.delete('/:id', productController.remove);
router.post('/', upload.fields([
  { name: 'mainPhoto', maxCount: 1 },
  { name: 'detailPhotos', maxCount: 10 }
]), productController.save);

module.exports = router;