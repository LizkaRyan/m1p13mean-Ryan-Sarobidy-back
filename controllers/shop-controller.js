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

module.exports = { getById, getAllDisponibles, getByUserId };
