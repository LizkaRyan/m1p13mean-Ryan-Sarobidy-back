const RequestReservation = require('../models/requests-reservation/RequestReservation');
const { patchRequestReservationSchema } = require("../validators/request-reservation-validator");

const findAll = async (req, res) => {
  try {
    const requests = await RequestReservation.find({ validated: null });

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
    );

    if (!updatedRequestReservation) {
      return res.status(404).json({ message: "Demande de réservation non trouvée" });
    }
    res.status(200).json(await RequestReservation.find({ validated: null }));
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

module.exports = { findAll, patch };
