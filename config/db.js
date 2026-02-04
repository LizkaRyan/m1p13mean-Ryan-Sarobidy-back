const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
.then(() => {
  console.log('✅ Connecté à MongoDB !');
})
.catch((err) => {
  console.error('❌ Erreur de connexion :', err);
});
