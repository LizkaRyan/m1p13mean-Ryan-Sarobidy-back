const Room = require('../models/room/Room');
const roomSchema = require("../validators/room-validator");

const save = async (req, res) => {
    try {
        await roomSchema.validate(req.body);
        const room = await Room.create(req.body);
        res.json({ message: "Insertion réussie", room });
    } catch (err) {
        return res.status(400).json({
            message: "Validation échouée",
            errors: err.errors
        });
    }
};

module.exports = { save };
