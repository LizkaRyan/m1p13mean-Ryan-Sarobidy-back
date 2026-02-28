const { getAllRequestsEvent } = require('../services/RequestsEventService');
const { findByYear, createEventByRequest } = require('../services/EventService');
const { patchRequestEventValidator } = require('../validators/request-event-validator');
const RequestsEvent = require('../models/event/RequestsEvent');
const { createNotificationForAll } = require('../services/NotificationService');
const { formatDate } = require('../services/StringService');

const findWithEvent = async (req, res) => {
    try {
        const { status, year } = req.query;
        const requests = await getAllRequestsEvent(status, year);
        const events = await findByYear(year);

        res.json({ requests, events });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const findAll = async (req, res) => {
    try {
        const { status, year } = req.query;
        const requests = await getAllRequestsEvent(status, year);
        res.json(requests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const patch = async (req, res) => {
    try {
        // Validation Yup
        await patchRequestEventValidator.validate(req.body);
        const { id } = req.params;
        const updateData = req.body; // données envoyées par le client
        // Met à jour et renvoie le document modifié
        const updatedRequestEvent = await RequestsEvent.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true, setDefaultsOnInsert: true } // renvoie le doc après update + validation Mongoose
        );

        if (!updatedRequestEvent) {
            return res.status(404).json({ message: "Demande d'événement non trouvée" });
        }

        if (updateData.status && updateData.status.code === "APPROVED") {
            let event = await createEventByRequest(updatedRequestEvent);
            const notification = {
                type: {
                    code: "NEW_EVENT",
                    label: "Nouvelle évènement"
                },
                payload: {
                    eventId: event._id,
                },
                message: "Nouvelle événement créé: " + event.title + " le " + formatDate(event.startDate),
                createdAt: new Date(),
                read: false
            }
            await createNotificationForAll(notification);
        }

        const requests = await getAllRequestsEvent("REQUEST", updatedRequestEvent.startDate.getFullYear());
        const events = await findByYear(updatedRequestEvent.startDate.getFullYear());
        res.status(200).json({ requests, events });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
}

module.exports = { findWithEvent, findAll, patch };