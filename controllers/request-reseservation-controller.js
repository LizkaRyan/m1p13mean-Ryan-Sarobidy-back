const RequestReservation = require('../models/requests-reservation/RequestReservation');

const findAll = async (req, res) => {
  try {
    const requests = await RequestReservation.find();

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

module.exports = { findAll };
