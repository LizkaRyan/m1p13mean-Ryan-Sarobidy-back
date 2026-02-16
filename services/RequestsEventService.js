const RequestsEvent = require('../models/event/RequestsEvent');

const getAllRequestsEvent = async (status, year) => {
    try {
        const filter = {};

        if (status) {
            filter["status.code"] = status;
        }

        if (year) {
            const startYear = new Date(`${year}-01-01T00:00:00.000Z`);
            const endYear = new Date(`${year}-12-31T23:59:59.999Z`);

            filter.$or = [
                // Cas où endDate existe
                {
                    startDate: { $lte: endYear },
                    endDate: { $gte: startYear }
                },

                // Cas où endDate est null (événement sur un seul jour)
                {
                    startDate: { $gte: startYear, $lte: endYear },
                    endDate: null
                }
            ];
        }

        const requests = await RequestsEvent.find(filter).populate('shopId',"name");
        return requests;
    } catch (error) {
        throw error;
    }
}

module.exports = { getAllRequestsEvent };