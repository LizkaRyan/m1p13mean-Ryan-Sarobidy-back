const Shop = require('../models/shop/Shop');
const Reservation = require('../models/reservation/Reservation');

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const shop = await Shop.findById(id).select('-roomHistory -status');
        const rooms = await Reservation.find({ shopId: id }).select('roomId').populate({
            path: "roomId",
            select: "name"
        });
        res.json({ ...shop._doc, rooms: rooms.map(r => r.roomId.name) });
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

module.exports = { getById, getAllDisponibles, getByUserId };
