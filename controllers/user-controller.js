const User = require('../models/user/User');
const { notificationValidator } = require('../validators/notification-validator');
const mongoose = require('mongoose');
const { createNotification } = require('../services/NotificationService');

const patch = async function (req, res) {
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
}

const postNotification = async function (req, res) {
  try {
    const { id } = req.params;
    const notification = req.body;
    await notificationValidator.validate(notification);
    notification.createdAt = new Date();
    notification.read = false;
    let user = createNotification(id, notification);
    res.status(200).json({ message: 'Notification ajoutée', user });
  }
  catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
}

const getNotifications = async function (req, res) {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const notifications = await User.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) }
      },
      { $unwind: "$notifications" },
      { $sort: { "notifications.createdAt": -1 } }, // récent → ancien
      { $skip: skip },
      { $limit: limit },
      {
        $replaceRoot: { newRoot: "$notifications" }
      }
    ]);

    res.status(200).json(notifications);
  }
  catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
}

const makeItAllRead = async function (req, res) {
  try {
    const { id } = req.params;

    const result = await User.updateOne(
      { _id: id },
      { $set: { "notifications.$[elem].read": true } },
      { arrayFilters: [{ "elem.read": false }] }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json({
      message: 'Toutes les notifications non lues marquées comme lues'
    });

  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

const countUnread = async function (req, res) {
  try {
    const { id } = req.params;

    const result = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $project: {
          unreadCount: {
            $size: {
              $filter: {
                input: '$notifications',
                cond: { $eq: ['$$this.read', false] }
              }
            }
          }
        }
      }
    ]);

    if (result.length === 0) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.status(200).json( result[0].unreadCount );
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

module.exports = { patch, postNotification, getNotifications, makeItAllRead, countUnread };