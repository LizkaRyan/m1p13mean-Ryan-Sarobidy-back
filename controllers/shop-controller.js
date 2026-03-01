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

module.exports = { getById, getAllDisponibles };
