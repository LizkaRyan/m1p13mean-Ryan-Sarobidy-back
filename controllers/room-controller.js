const Room = require('../models/room/Room');
const { roomSchema, patchRoomSchema } = require("../validators/room-validator");
const { findDisponible } = require('../services/RoomService');
const mongoose = require("mongoose");

const save = async (req, res) => {
    try {
        await roomSchema.validate(req.body);
        const room = req.body;
        await Room.create(room);
        res.status(201).json(await findDisponible());
    } catch (err) {
        return res.status(400).json({
            message: "Validation échouée",
            errors: err.errors
        });
    }
};

const getAll = async (req, res) => {
    try {
        return res.status(200).json(await findDisponible());
    } catch (err) {
        return res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
}

const put = async (req, res) => {
    try {
        await roomSchema.validate(req.body);
        const { id } = req.params;
        const updateData = req.body; // données envoyées par le client
        updateData._id = id;
        // Met à jour et renvoie le document modifié
        const updatedRoom = await Room.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true, setDefaultsOnInsert: true } // renvoie le doc après update + validation Mongoose
        );

        if (!updatedRoom) {
            return res.status(404).json({ message: "Salle non trouvée" });
        }

        res.status(200).json(await findDisponible());
    }
    catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
}

const patch = async (req, res) => {
    const session = await mongoose.startSession();
    try {

        // Validation Yup
        await patchRoomSchema.validate(req.body);
        const { id } = req.params;
        const updateData = req.body; // données envoyées par le client
        // Met à jour et renvoie le document modifié
        const updatedRoom = await Room.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true, setDefaultsOnInsert: true } // renvoie le doc après update + validation Mongoose
        );

        if (!updatedRoom) {
            return res.status(404).json({ message: "Salle non trouvée" });
        }

        if(updateData.deletedAt!=null && updatedRoom.status.code === "AVAILABLE"){
            throw new Error("Impossible de supprimer une salle disponible");
        }

        await session.commitTransaction();

        res.status(200).json(await findDisponible());
    } catch (err) {
        await session.abortTransaction();
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    } finally {
        session.endSession();
    }
}

module.exports = { save, getAll, put, patch };
