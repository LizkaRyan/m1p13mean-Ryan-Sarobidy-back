const yup = require("yup");

const patchRequestReservationSchema = yup.object({
    shopId: yup.string(),
    roomId: yup.string(),
    beginingDate: yup.date(),
    endingDate: yup.date(),
    validated: yup.boolean().nullable(),
});

module.exports = { patchRequestReservationSchema };