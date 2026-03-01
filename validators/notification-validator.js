const yup = require("yup");

const notificationValidator = yup.object({
    "type": yup.object({
        "code": yup.string().required(),
        "label": yup.string().required()
    }).required(),
    "payload": yup.mixed().required(),
    "message": yup.string().required(),
});

module.exports = { notificationValidator };