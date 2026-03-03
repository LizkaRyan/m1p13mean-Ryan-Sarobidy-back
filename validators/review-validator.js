const yup = require("yup");

const reviewValidator = yup.object({
    userId: yup.string().required(),
    shopId: yup.string().required(),
    rating: yup.number().min(1).max(5).required(),
    text: yup.string().max(500),
    createdAt: yup.date().default(() => new Date()),
});

module.exports = { reviewValidator };