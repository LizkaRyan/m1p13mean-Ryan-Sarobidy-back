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
      select: "name floor"
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

const buildPhotos = (req) => {
  const photos = [];
  if (req.files?.['exteriorPhoto']?.[0]) {
    photos.push({
      url: `/uploads/${req.files['exteriorPhoto'][0].filename}`,
      createdAt: new Date().toISOString(),
      type: { code: 'EXTERIOR', label: 'Exterior' }
    });
  }
  if (req.files?.['interiorPhoto']?.[0]) {
    photos.push({
      url: `/uploads/${req.files['interiorPhoto'][0].filename}`,
      createdAt: new Date().toISOString(),
      type: { code: 'INTERIOR', label: 'Interior' }
    });
  }
  (req.files?.['diversPhotos'] ?? []).forEach(file => {
    photos.push({
      url: `/uploads/${file.filename}`,
      createdAt: new Date().toISOString(),
      type: { code: 'DIVERS', label: 'Divers' }
    });
  });
  return photos;
};

const save = async (req, res) => {
  try {
    console.log('req.files keys:', Object.keys(req.files ?? {}));
    console.log('exteriorPhoto:', req.files?.['exteriorPhoto']?.[0]?.filename);
    console.log('interiorPhoto:', req.files?.['interiorPhoto']?.[0]?.filename);
    const body = {
      ...req.body,
      category: JSON.parse(req.body.category),
      photos: buildPhotos(req)
    };
    const shop = await Shop.create(body);
    res.status(201).json(shop);
  } catch (err) {
    res.status(400).json({ message: 'Erreur création', error: err.message });
  }
};

const updateById = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      name: req.body.name,
      category: JSON.parse(req.body.category),
    };

    // Ajouter les nouvelles photos si envoyées
    const newPhotos = buildPhotos(req);
    if (newPhotos.length > 0) {
      updateData.photos = newPhotos; 
    }

    const updated = await Shop.findByIdAndUpdate(
      id,
      updateData,
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

module.exports = { getById, getAllDisponibles, getByUserId, save, updateById, deleteById };