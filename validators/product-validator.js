const yup = require("yup");

// Schéma photo réutilisable
const productPhotoYupSchema = yup.object({
    url: yup.string().url("L'URL de la photo est invalide").required("URL requise"),
    createdAt: yup.string().required("Date de création requise"),
    type: yup.object({
        code: yup.string().required("Code du type requis"),
        label: yup.string().required("Label du type requis")
    }).required("Type requis")
});

// POST - création
const productSchema = yup.object({
    name: yup.string().required("Nom du produit requis"),
    unityPrice: yup.number().positive("Le prix doit être positif").required("Prix requis"),
    category: yup.object({
        code: yup.string().required("Code catégorie requis"),
        label: yup.string().required("Label catégorie requis")
    }).required("Catégorie requise"),
    shopId: yup.string().required("Shop requis"),
    description: yup.string(),
    status: yup.object({
        code: yup.string().required("Code statut requis"),
        label: yup.string().required("Label statut requis")
    }).required("Statut requis"),
    photos: yup.array().of(productPhotoYupSchema)
});

// PATCH - modification partielle
const patchProductSchema = yup.object({
    name: yup.string(),
    unityPrice: yup.number().positive("Le prix doit être positif"),
    category: yup.object({
        code: yup.string(),
        label: yup.string()
    }),
    shopId: yup.string(),
    description: yup.string().nullable(),
    status: yup.object({
        code: yup.string(),
        label: yup.string()
    }),
    photos: yup.array().of(productPhotoYupSchema)
});

module.exports = { productSchema, patchProductSchema };