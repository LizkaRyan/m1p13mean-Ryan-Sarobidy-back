const Event = require('../models/event/Event');

const getAllEvents = async (req, res) => {
    try {
        const { year } = req.query; // année en query param, ex: ?year=2026

        let filter = {};
        if (year) {
            filter = {
                $expr: { $eq: [{ $year: "$startDate" }, parseInt(year)] }
            };
        }

        const events = await Event.find(filter).populate('shopId', 'name');
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
}

module.exports = { getAllEvents };