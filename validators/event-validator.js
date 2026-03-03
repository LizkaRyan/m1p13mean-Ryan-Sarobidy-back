const yup = require("yup");

const eventValidator = yup.object({
    "title": yup.string().required(),
    "shopId": yup.string().nullable(),
    "startDate": yup.date().required(),
    "endDate": yup.date().required(),
    "description": yup.string().required(),
    "createdAt": yup.date().required(),
    "themes": yup.array().of(yup.string()).required(),
    "color": yup.string().required(),
    "deletedAt": yup.date("La date de suppression doit être une date").nullable()
});

const patchEventValidator = yup.object({
    "title": yup.string(),
    "shopId": yup.string().nullable(),
    "startDate": yup.date(),
    "endDate": yup.date(),
    "description": yup.string(),
    "createdAt": yup.date(),
    "themes": yup.array().of(yup.string()),
    "color": yup.string(),
    "deletedAt": yup.date("La date de suppression doit être une date").nullable()
});

module.exports = { eventValidator, patchEventValidator };