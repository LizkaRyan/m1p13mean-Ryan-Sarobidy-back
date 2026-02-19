const Reservation = require('../models/reservation/Reservation');
const reservationService = require('../services/ReservationService');

const getStatisticPaidAndUnpaid = async (req, res) => {
    try {
        const { startMonth, endMonth } = req.query;

        if (startMonth === undefined || endMonth === undefined) {
            return res.status(400).json({ message: 'startMonth et endMonth sont requis' });
        }

        res.status(200).json(await reservationService.getStatisticPaidAndUnpaid(startMonth, endMonth));
    }
    catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
}

const getShopUnpaid = async (req, res) => {
    try {
        const { endMonth } = req.query;

        if (!endMonth) {
            return res.status(400).json({ message: 'endMonth est requis' });
        }

        res.status(200).json(await reservationService.getShopUnpaid(endMonth));
    }
    catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
}

const pay = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const { status } = req.body;
        const updatedReservation = await Reservation.updateOne(
            {
                "paymentHistory._id": paymentId
            },
            {
                $set: {
                    "paymentHistory.$.status": status,
                    "paymentHistory.$.paidAt": new Date()
                }
            }
        );

        if (updatedReservation.matchedCount === 0) {
            return res.status(404).json({ message: 'Paiement non trouvée' });
        }

        res.status(200).json(updatedReservation);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
}

const formatOnlyMonth = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // ajoute 0 si < 10
    return `${date.getFullYear()}-${month}`;
}

module.exports = { getStatisticPaidAndUnpaid, getShopUnpaid, pay };