const Reservation = require('../models/reservation/Reservation');

const getStatisticPaidAndUnpaid = async (req, res) => {
    try {
        const { startMonth, endMonth } = req.query;

        if(startMonth === undefined || endMonth === undefined) {
            return res.status(400).json({ message: 'startMonth et endMonth sont requis' });
        }

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
        res.status(200).json(stats);
    }
    catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
}

module.exports = { getStatisticPaidAndUnpaid };