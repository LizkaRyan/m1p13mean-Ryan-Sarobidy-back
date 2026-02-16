const yup = require("yup");

const patchRequestEventValidator = yup.object({
    "title": yup.string(),
    "shopId": yup.string().nullable(),
    "startDate": yup.date(),
    "endDate": yup.date(),
    "description": yup.string(),
    "createdAt": yup.date(),
    "themes": yup.array().of(yup.string()),
    "color": yup.string(),
    "status": yup.object({
        "code": yup.string(),
        "label": yup.string()
    }),
    "deletedAt": yup.date("La date de suppression doit être une date").nullable()
});

module.exports = { patchRequestEventValidator };