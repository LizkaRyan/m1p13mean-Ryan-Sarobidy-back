const Event = require('../models/event/Event');

const findByYear = async (year) => {
    try {
        let filter = {};
        if (year) {
            filter = {
                $expr: { $eq: [{ $year: "$startDate", $year: "$endDate" }, parseInt(year)] },
                deletedAt: null
            };
        }

        const events = await Event.find(filter).populate('shopId', 'name');
        return events;
    } catch (err) {
        throw new Error('Erreur lors de la récupération des événements : ' + err.message);
    }
}

const createEventByRequest = async (requestEvent) => {
    const eventData = {
        title: requestEvent.title,
        shopId: requestEvent.shopId,
        startDate: requestEvent.startDate,
        endDate: requestEvent.endDate,
        description: requestEvent.description,
        themes: requestEvent.themes,
        createdAt: new Date(),
        color: requestEvent.color,
        deletedAt: null
    };
    return await Event.create(eventData);
}

module.exports = { findByYear, createEventByRequest };