const User = require('../models/user/User');

const createNotification = async (userId, notification) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }
        user.notifications.push(notification);
        await user.save();
        return user;
    }
    catch (err) {
        throw new Error('Erreur lors de la création de la notification : ' + err.message);
    }
}

module.exports = { createNotification };