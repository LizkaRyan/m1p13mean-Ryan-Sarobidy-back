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
    area: yup.number().positive("La surface doit être positive").required("Surface requise")
  }).required("Dimensions requises")
});

module.exports = roomSchema;