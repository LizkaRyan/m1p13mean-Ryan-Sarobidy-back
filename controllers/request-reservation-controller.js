const RequestReservation = require('../models/reservation/RequestReservation');
const { patchRequestReservationSchema } = require("../validators/request-reservation-validator");
const { createReservation } = require('../services/ReservationService');
const { updateRoomAvailability } = require('../services/RoomService');
const mongoose = require("mongoose");

const findAll = async (req, res) => {
  try {
    const requests = await RequestReservation.find({ validated: null }).populate('shopId').populate('roomId');

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { shopId, roomId, beginingDate, endingDate } = req.body;

    if (!shopId || !roomId || !beginingDate || !endingDate) {
      return res.status(400).json({ message: 'Champs requis manquants : shopId, roomId, beginingDate, endingDate' });
    }

    const newRequest = new RequestReservation({
      shopId: new mongoose.Types.ObjectId(shopId),
      roomId: new mongoose.Types.ObjectId(roomId),
      beginingDate: new Date(beginingDate),
      endingDate: new Date(endingDate),
      validated: null
    });

    const saved = await newRequest.save();
    const populated = await saved.populate(['shopId', 'roomId']);

    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

const patch = async (req, res) => {
  try {
    // Validation Yup
    await patchRequestReservationSchema.validate(req.body);
    const { id } = req.params;
    const updateData = req.body; // données envoyées par le client
    // Met à jour et renvoie le document modifié
    const updatedRequestReservation = await RequestReservation.findByIdAndUpdate(
      id,
      updateData // renvoie le doc après update + validation Mongoose
    ).populate('roomId');

    if (!updatedRequestReservation) {
      return res.status(404).json({ message: "Demande de réservation non trouvée" });
    }

    if (updateData.validated && updateData.validated === true) {
      await createReservation({
        shopId: updatedRequestReservation.shopId,
        room: updatedRequestReservation.roomId,
        beginingDate: updatedRequestReservation.beginingDate,
        endingDate: updatedRequestReservation.endingDate
      });
      await updateRoomAvailability(updatedRequestReservation.roomId._id, false);
    }


    res.status(200).json(await RequestReservation.find({ validated: null }).populate('shopId').populate('roomId'));
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

module.exports = { findAll, patch, create };
