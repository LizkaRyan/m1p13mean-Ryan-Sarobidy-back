const Shop = require('../models/shop/Shop');
const { shopSchema, patchShopSchema } = require('../validators/shop-validator');
const { findAll, findById } = require('../services/ShopService');

const getAllShops = async (req, res) => {
  try {
    const shops = await findAll();
    res.json(shops);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

const getShop = async (req, res) => {
  try {
    const shop = await findById(req.params.id);
    if (!shop) return res.status(404).json({ message: "Boutique non trouvée" });
    res.json(shop);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

const save = async (req, res) => {
  try {
    await shopSchema.validate(req.body);
    const shop = req.body;
    await Shop.create(shop);
    res.status(201).json(await findAll());
  } catch (err) {
    res.status(400).json({ message: "Validation échouée", errors: err.errors });
  }
};

const put = async (req, res) => {
  try {
    await shopSchema.validate(req.body);
    const { id } = req.params;
    const updateData = req.body;
    updateData._id = id;
    const updatedShop = await Shop.findByIdAndUpdate(id, updateData, { new: true, runValidators: true, setDefaultsOnInsert: true });
    if (!updatedShop) return res.status(404).json({ message: "Boutique non trouvée" });
    res.json(await findAll());
  } catch (err) {
    res.status(400).json({ message: "Erreur mise à jour", error: err.message });
  }
};

const patch = async (req, res) => {
  try {
    await patchShopSchema.validate(req.body);
    const { id } = req.params;
    const updatedShop = await Shop.findByIdAndUpdate(id, req.body, { new: true, runValidators: true, setDefaultsOnInsert: true });
    if (!updatedShop) return res.status(404).json({ message: "Boutique non trouvée" });
    res.json(await findAll());
  } catch (err) {
    res.status(400).json({ message: "Erreur mise à jour partielle", error: err.message });
  }
};

module.exports = { getAllShops, getShop, save, put, patch };