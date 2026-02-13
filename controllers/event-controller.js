const Event = require('../models/event/Event');
const { eventValidator, patchEventValidator } = require('../validators/event-validator');
const { findByYear } = require('../services/EventService');

const getAllEvents = async (req, res) => {
    try {
        const { year } = req.query; // année en query param, ex: ?year=2026

        const events = await findByYear(year);
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
}

const save = async (req, res) => {
    try {
        await eventValidator.validate(req.body);
        const event = req.body;
        await Event.create(event);
        res.status(201).json(await findByYear(new Date(event.startDate).getFullYear()));
    } catch (err) {
        return res.status(400).json({
            message: "Validation échouée",
            errors: err.errors
        });
    }
};

const patch = async (req, res) => {
    try {
        // Validation Yup
        await patchEventValidator.validate(req.body);
        const { id } = req.params;
        const updateData = req.body; // données envoyées par le client
        // Met à jour et renvoie le document modifié
        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true, setDefaultsOnInsert: true } // renvoie le doc après update + validation Mongoose
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: "Événement non trouvé" });
        }

        res.status(200).json(await findByYear(new Date(updatedEvent.startDate).getFullYear()));
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    } finally {
        session.endSession();
    }
}
module.exports = { getAllEvents, save, patch };