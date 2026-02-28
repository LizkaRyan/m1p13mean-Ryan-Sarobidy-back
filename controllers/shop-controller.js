const Shop = require('../models/shop/Shop');

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        res.json(await Shop.findById(id));
    }
    catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

module.exports = { getById };