const Reservation = require('../models/reservation/Reservation');
const Event = require('../models/event/Event');

const findByYear = async (year) => {
    try {
        let filter = {};
        if (year) {
            filter = {
                $expr: { $eq: [{ $year: "$startDate", $year: "$endDate" }, parseInt(year)] }
            };
        }

        const events = await Event.find(filter).populate('shopId', 'name');
        return events;
    } catch (err) {
        throw new Error('Erreur lors de la récupération des événements : ' + err.message);
    }
}

module.exports = { findByYear };