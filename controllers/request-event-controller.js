const { getAllRequestsEvent } = require('../services/RequestsEventService');
const { findByYear } = require('../services/EventService');

const findAll = async (req, res) => {
    try{
        const { status, year } = req.query;
        const requests = await getAllRequestsEvent(status, year);
        const events = await findByYear(year);

        res.json({ requests, events });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { findAll };