const Event = require('../models/event/Event');
const { eventValidator } = require('../validators/event-validator');
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
module.exports = { getAllEvents, save };