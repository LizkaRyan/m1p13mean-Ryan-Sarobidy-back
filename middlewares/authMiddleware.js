// middlewares/authMiddleware.js
module.exports = function (req, res, next) {
    const publicRoutes = [
        '/auth/login',
        '/auth/signup'
    ];

    if (req.path.startsWith('/uploads/')) {
        return next();
    }

    if (publicRoutes.includes(req.path)) {
        return next(); // 🔓 pas de middleware
    }

    const authHeader = req.headers['authorization']; // récupère le header
    if (!authHeader) {
        return res.status(401).json({ message: 'Token manquant' });
    }

    const token = authHeader.split(' ')[1]; // normalement "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: 'Token invalide' });
    }

    // Ici tu peux vérifier le token, par ex avec jwt
    const jwt = require('jsonwebtoken');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // tu peux stocker les infos du user
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token non valide' });
    }

};
