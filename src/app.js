// src/app.js
require('dotenv').config(); // Charge les variables d'environnement

const express = require('express');
const cors = require('cors');
const villesRoutes = require('./routes/villes');
const authRoutes = require('./routes/authRoutes'); // Importe les routes d'authentification
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT;

// Connecter à MongoDB
connectDB();

// Middleware pour analyser le corps des requêtes en JSON
app.use(express.json());

// Middleware CORS pour autoriser les requêtes cross-origin
app.use(cors());

// Définition des routes de l'API
app.use('/api/villes', villesRoutes);
app.use('/api/auth', authRoutes); // Ajoute les routes d'authentification

// Route par défaut
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API des villes de France (MongoDB & JWT) !');
});

// Gestion des erreurs 404 (route non trouvée)
app.use((req, res, next) => {
    res.status(404).send("Désolé, la page demandée n'existe pas.");
});

// Gestionnaire d'erreurs général (doit être le dernier middleware)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Quelque chose s\'est mal passé !');
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur API démarré sur http://localhost:${PORT}`);
    console.log('Connecté à MongoDB.');
});