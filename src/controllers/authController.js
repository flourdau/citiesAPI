// src/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Fonction utilitaire pour générer un JWT
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
    });
};

// @desc    Enregistrer un nouvel utilisateur
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'Le nom d\'utilisateur est déjà pris.' });
        }

        // Créer un nouvel utilisateur
        const user = await User.create({ username, password, role });

        res.status(201).json({
            _id: user._id,
            username: user.username,
            role: user.role,
            token: generateToken(user._id, user.role)
        });
    } catch (error) {
        console.error("Erreur lors de l'enregistrement de l'utilisateur:", error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Erreur serveur lors de l\'enregistrement.' });
    }
};

// @desc    Authentifier un utilisateur et obtenir un token
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Nom d\'utilisateur ou mot de passe invalide.' });
        }

        // Vérifier le mot de passe
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Nom d\'utilisateur ou mot de passe invalide.' });
        }

        res.json({
            _id: user._id,
            username: user.username,
            role: user.role,
            token: generateToken(user._id, user.role)
        });
    } catch (error) {
        console.error("Erreur lors de la connexion de l'utilisateur:", error);
        res.status(500).json({ message: 'Erreur serveur lors de la connexion.' });
    }
};