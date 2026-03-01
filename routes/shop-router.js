const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop-controller');

router.get('/available', shopController.getAllDisponibles);
router.get('/:id', shopController.getById);
router.get('/user/:userId', shopController.getByUserId); 
router.post('/create', shopController.create);
router.put('/:id', shopController.updateById);
router.delete('/:id', shopController.deleteById);

module.exports = router;
