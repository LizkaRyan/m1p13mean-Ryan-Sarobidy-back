const mongoose = require('mongoose');
const Shop = require('../models/shop/Shop');
const Reservation = require('../models/reservation/Reservation');
const Review = require('../models/shop/Review');

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const shop = await Shop.findById(id).select('-roomHistory -status');
    const rooms = await Reservation.find({ shopId: id }).select('roomId').populate({
      path: "roomId",
      select: "name"
    });
    const existing = await Review.findOne({
      userId: req.user.id,
      shopId: id
    });
    const canAddReview = !existing;
    res.json({ shop: {...shop._doc, rooms: rooms.map(r => r.roomId.name)}, canAddReview });
  }
  catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

const getAllDisponibles = async (req, res) => {
  try {
    const reservation = await Reservation.find({
      dateMax: { $gte: new Date() }
    }).select("shopId roomId").populate({
      path: "shopId",
      select: "-status -roomHistory -photos"
    }).populate({
      path: "roomId",
      select: "name"
    });
    res.json(reservation);
  }
  catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

const getByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Récupérer toutes les boutiques associées à cet utilisateur
    const shops = await Shop.find({ userId }).select('-roomHistory -status');

    if (!shops || shops.length === 0) {
      return res.status(404).json({ message: "Aucune boutique trouvée pour cet utilisateur" });
    }

    // Optionnel : récupérer rooms pour chaque boutique
    const result = await Promise.all(
      shops.map(async (shop) => {
        const rooms = await Reservation.find({ shopId: shop._id }).select('roomId').populate({
          path: "roomId",
          select: "name"
        });
        return { ...shop._doc, rooms: rooms.map(r => r.roomId.name) };
      })
    );

    res.json(result);

  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { name, category, userId } = req.body;

    if (!name || !category?.code || !category?.label || !userId) {
      return res.status(400).json({ message: 'Champs requis manquants : name, category.code, category.label, userId' });
    }

    const newShop = new Shop({
      name,
      category: {
        code: category.code,
        label: category.label
      },
      userId: new mongoose.Types.ObjectId(userId)
    });

    const saved = await newShop.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category } = req.body;

    const updated = await Shop.findByIdAndUpdate(
      id,
      { name, category },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Boutique non trouvée' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Shop.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Boutique non trouvée' });
    }

    res.status(200).json({ message: 'Boutique supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

module.exports = { getById, getAllDisponibles, getByUserId, create, updateById, deleteById };