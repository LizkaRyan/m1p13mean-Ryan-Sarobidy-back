const express = require('express');
const router = express.Router();
const { getAllShops, getShop, save, put, patch } = require('../controllers/shop-controller');

// CRUD Shop
router.get('/', getAllShops);       // GET /api/shops
router.get('/:id', getShop);        // GET /api/shops/:id
router.post('/', save);             // POST /api/shops
router.put('/:id', put);            // PUT /api/shops/:id
router.patch('/:id', patch);        // PATCH /api/shops/:id

module.exports = router;