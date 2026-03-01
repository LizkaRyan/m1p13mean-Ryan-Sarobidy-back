const Reservation = require('../models/reservation/Reservation');

const createReservation = async ({ shopId, room, beginingDate, endingDate }) => {
  const newReservation = {
    shopId: shopId,
    roomId: room._id,
    createdAt: new Date(),
    paymentHistory: generateMonthlyPayments(beginingDate, endingDate, room.rentPrice),
    dateMax: endingDate,
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

    payments.push({
      month: monthStr,
      amount: amount,
      paidAt: null,
      status: "PENDING"
    });

    // Passer au mois suivant
    current.setMonth(current.getMonth() + 1);
  }

  return payments;
}

const getStatisticPaidAndUnpaid = async (startMonth, endMonth) => {
  const stats = await Reservation.aggregate([
    { $unwind: "$paymentHistory" },

    {
      $match: {
        "paymentHistory.month": { $gte: startMonth, $lte: endMonth }
      }
    },

    {
      $group: {
        _id: "$paymentHistory.month",

        totalPaid: {
          $sum: {
            $cond: [
              { $eq: ["$paymentHistory.status", "PAID"] },
              "$paymentHistory.amount",
              0
            ]
          }
        },

        totalUnpaid: {
          $sum: {
            $cond: [
              { $ne: ["$paymentHistory.status", "PAID"] },
              "$paymentHistory.amount",
              0
            ]
          }
        }
      }
    },

    { $sort: { _id: 1 } }
  ]);
  return stats;
}

const getShopUnpaid = async (endMonth) => {
  const stats = await Reservation.aggregate([
    { $unwind: "$paymentHistory" },

    {
      $match: {
        "paymentHistory.month": { $lte: endMonth },
        "paymentHistory.status": { $ne: "PAID" }
      }
    },
    {
      $lookup: {
        from: "shops",
        localField: "shopId",
        foreignField: "_id",
        as: "shop"
      }
    },
    { $unwind: "$shop" },

    {
      $lookup: {
        from: "users",
        localField: "shop.userId",
        foreignField: "_id",
        as: "shopUser"
      }
    },
    { $unwind: "$shopUser" },

    // 5️⃣ Lookup pour Room
    {
      $lookup: {
        from: "rooms",
        localField: "roomId",
        foreignField: "_id",
        as: "room"
      }
    },
    { $unwind: "$room" },

    // 6️⃣ Projeter les champs utiles
    {
      $project: {
        _id: "$paymentHistory._id",
        reservationId: "$_id",
        month: "$paymentHistory.month",
        amount: "$paymentHistory.amount",
        status: "$paymentHistory.status",
        shop: {
          _id: "$shop._id",
          name: "$shop.name",
          category: "$shop.category"
        },
        shopUser: {
          _id: "$shopUser._id",
          name: "$shopUser.name",
          email: "$shopUser.email"
        },
        room: {
          _id: "$room._id",
          name: "$room.name"  // selon ton schema Room
        }
      }
    }
  ]);
  return stats;
}

module.exports = { createReservation, getStatisticPaidAndUnpaid, getShopUnpaid };