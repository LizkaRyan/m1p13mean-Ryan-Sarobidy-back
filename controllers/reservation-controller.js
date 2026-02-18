const Reservation = require('../models/reservation/Reservation');

const getStatisticPaidAndUnpaid = async (req, res) => {
    try {
        const { startMonth, endMonth } = req.query;

        if (startMonth === undefined || endMonth === undefined) {
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

const getShopUnpaid = async (req, res) => {
    try {
        const { endMonth } = req.query;

        if (endMonth === undefined) {
            return res.status(400).json({ message: 'endMonth est requis' });
        }

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
                    _id: 0,
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

        res.status(200).json(stats);
    }
    catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
}

module.exports = { getStatisticPaidAndUnpaid, getShopUnpaid };