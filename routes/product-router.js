const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');

router.get('/', productController.getAllProducts);
router.get('/shop/:shopId', productController.getProductsByShopId);
router.get('/:id', productController.getProductById);
router.post('/', productController.save);
router.patch('/:id', productController.patch);
router.delete('/:id', productController.remove);

module.exports = router;