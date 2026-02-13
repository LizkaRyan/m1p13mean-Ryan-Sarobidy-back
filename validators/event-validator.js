const yup = require("yup");

const eventValidator = yup.object({
    "title": yup.string().required(),
    "shopId": yup.string().nullable(),
    "startDate": yup.date().required(),
    "endDate": yup.date().required(),
    "description": yup.string().required(),
    "createdAt": yup.date().required(),
    "themes": yup.array().of(yup.string()).required(),
    "color": yup.string().required()
});

module.exports = { eventValidator };