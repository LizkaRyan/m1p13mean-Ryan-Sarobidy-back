const RequestReservation = require('../models/reservation/RequestReservation');
const { patchRequestReservationSchema } = require("../validators/request-reservation-validator");
const { createReservation } = require('../services/ReservationService');
const { updateRoomAvailability } = require('../services/RoomService');
const user = require('../models/user/User');

const findAll = async (req, res) => {
  try {
    const requests = await RequestReservation.find({ validated: null }).populate('shopId').populate('roomId');

    res.json(requests);
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
    ).populate('roomId').populate({ path: 'shopId', populate: { path: 'userId' } });

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
      const notification = {
        type: {
          code: "REQUEST_RESERVATION",
          label: "Requête de Reservation"
        },
        payload: {
          requestReservationId: updatedRequestReservation._id,
        },
        message: "Requête de réservation validée",
        createdAt: new Date(),
        read: false
      };
      updatedRequestReservation.shopId.userId.notifications.push(notification);
      await updatedRequestReservation.shopId.userId.save();
    }
    if(updateData.validated && updateData.validated === false) {
      const notification = {
        type: {
          code: "REQUEST_RESERVATION",
          label: "Requête de Reservation"
        },
        payload: {
          requestReservationId: updatedRequestReservation._id,
        },
        message: "Requête de réservation refusée",
        createdAt: new Date(),
        read: false
      };
      updatedRequestReservation.shopId.userId.notifications.push(notification);
      await updatedRequestReservation.shopId.userId.save();
    }

    res.status(200).json(await RequestReservation.find({ validated: null }).populate('shopId').populate('roomId'));
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

module.exports = { findAll, patch };
