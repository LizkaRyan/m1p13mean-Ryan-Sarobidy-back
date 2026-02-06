const yup = require("yup");

const roomSchema = yup.object({
  name: yup.string().required("Nom requis"),
  rentPrice: yup.number().positive("Le prix doit être positif").required("Prix requis"),
  status: yup.object({
    code: yup.string().required("Statut requis"),
    label: yup.string().required("Statut requis")
  }).required("Statut requis"),
  floor: yup.number("L'étage doit être un nombre").required("L'étage est requis"),
  capacity: yup.number().integer("La capacité doit être un entier").positive("La capacité doit être positive").required("Capacité requise"),
  dimensions: yup.object({
    length: yup.number().positive("La longueur doit être positive").required("Longueur requise"),
    width: yup.number().positive("La largeur doit être positive").required("Largeur requise"),
    height: yup.number().positive("La hauteur doit être positive").required("Hauteur requise"),
  }).required("Dimensions requises"),
  deletedAt:yup.date("La date de suppression doit être une date").nullable()
});

const patchRoomSchema = yup.object({
  name: yup.string(),
  rentPrice: yup.number(),
  status: yup.object({
    code: yup.string(),
    label: yup.string()
  }),
  floor: yup.string().nullable(),
  capacity: yup.number(),
  dimensions: yup.object({
    length: yup.number(),
    width: yup.number(),
    height: yup.number(),
    area: yup.number()
  }),
  deletedAt:yup.date("La date de suppression doit être une date").nullable()
});

module.exports = { roomSchema, patchRoomSchema };