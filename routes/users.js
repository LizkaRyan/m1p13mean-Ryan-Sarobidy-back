var express = require('express');
var router = express.Router();
const User = require('../models/user/User');

/* GET users listing. */
router.patch('/:id', async function(req, res) {
  try {
    const { name, email, password, role } = req.body;

    // Créer un objet avec seulement les champs à mettre à jour
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = password; // Le hash se fera dans le middleware pre('save')
    if (role) updateData.role = role;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'Aucun champ à mettre à jour' });
    }

    // findByIdAndUpdate permet de ne mettre à jour que les champs spécifiés
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true } // new: retourne le doc mis à jour, runValidators: valide les champs
    );

    if (!updatedUser) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.status(200).json({ message: 'Utilisateur mis à jour', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

module.exports = router;
