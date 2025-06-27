// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware pour protéger les routes (vérifie si l'utilisateur est authentifié)
exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extraire le token du header
            token = req.headers.authorization.split(' ')[1];

            // Vérifier le token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attacher l'utilisateur (sans le mot de passe) à l'objet req
            req.user = await User.findById(decoded.id).select('-password');
            req.user.role = decoded.role; // Assurez-vous que le rôle est aussi attaché
            next();
        } catch (error) {
            console.error('Erreur de validation du token:', error.message);
            return res.status(401).json({ message: 'Non autorisé, token invalide ou expiré.' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Non autorisé, aucun token fourni.' });
    }
};

// Middleware pour restreindre l'accès en fonction du rôle
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: `Accès non autorisé. Seuls les rôles ${roles.join(', ')} peuvent accéder à cette ressource.` });
        }
        next();
    };
};