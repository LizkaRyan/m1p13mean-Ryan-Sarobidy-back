const yup = require('yup');

const shopSchema = yup.object().shape({
  name: yup.string().required('Le nom est obligatoire'),
  category: yup.object().shape({
    code: yup.string().required('Code catégorie requis'),
    label: yup.string().required('Label catégorie requis')
  }),
  userId: yup.string().required('ID utilisateur requis') // ObjectId
});

const patchShopSchema = yup.object().shape({
  name: yup.string(),
  category: yup.object().shape({
    code: yup.string(),
    label: yup.string()
  }),
  userId: yup.string()
});

module.exports = { shopSchema, patchShopSchema };