const Reservation = require('../models/reservation/Reservation');

const createReservation = async ({shopId, room, beginingDate, endingDate}) => {
    const newReservation = {
        shopId: shopId,
        roomId: room._id,
        createdAt: new Date(),
        paymentHistory: generateMonthlyPayments(beginingDate, endingDate, room.rentPrice)
    };
    try {
        await Reservation.create(newReservation);
    } catch (err) {
        throw new Error('Erreur lors de la création de la réservation : ' + err.message);
    }
}

function generateMonthlyPayments(startDate, endDate, amount) {
  const payments = [];
  let current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    const monthStr = current.toISOString().slice(0, 7); // "YYYY-MM"
    const paidAt = current.getTime() === new Date(startDate).getTime() ? current.toISOString().slice(0, 10) : null;

    payments.push({
      month: monthStr,
      amount: amount,
      paidAt: paidAt,
      status: "PENDING"
    });

    // Passer au mois suivant
    current.setMonth(current.getMonth() + 1);
  }

  return payments;
}

module.exports = { createReservation };