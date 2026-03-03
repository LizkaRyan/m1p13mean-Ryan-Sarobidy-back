const Shop = require('../models/shop/Shop');

const findAll = async () => {
  try {
    const shops = await Shop.find().populate('userId', 'name email');
    return shops;
  } catch (err) {
    throw new Error('Erreur lors de la récupération des boutiques : ' + err.message);
  }
};

const findById = async (id) => {
  try {
    const shop = await Shop.findById(id).populate('userId', 'name email');
    if (!shop) throw new Error('Boutique non trouvée');
    return shop;
  } catch (err) {
    throw new Error('Erreur lors de la récupération de la boutique : ' + err.message);
  }
};

const findByUserId = async (userId) => {
  try {
    const shop = await Shop.findOne({ userId }).populate('userId', 'name email');
    if (!shop) throw new Error('Boutique non trouvée pour cet utilisateur');
    return shop;
  } catch (err) {
    throw new Error('Erreur lors de la récupération de la boutique : ' + err.message);
  }
};

const updateCategory = async (id, category) => {
  try {
    const updatedShop = await Shop.findByIdAndUpdate(
      id,
      { category },
      { new: true, runValidators: true }
    );
    if (!updatedShop) throw new Error('Boutique non trouvée');
    return updatedShop;
  } catch (err) {
    throw new Error('Erreur lors de la mise à jour de la catégorie de la boutique : ' + err.message);
  }
};

module.exports = { findAll, findById, updateCategory, findByUserId };