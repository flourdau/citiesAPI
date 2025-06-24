// src/app.js

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const villesRoutes = require('./routes/villes');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());

app.use(cors());

// Définition des routes de l'API
app.use('/api/villes', villesRoutes);

// Route par défaut pour vérifier si l'API est en ligne
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API des villes de France (MongoDB) !');
});

// Gestion des erreurs 404 (route non trouvée)
app.use((req, res, next) => {
    res.status(404).send("Désolé, la page demandée n'existe pas.");
});

// Gestionnaire d'erreurs général
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Quelque chose s\'est mal passé !');
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur API démarré sur http://localhost:${PORT}`);
    console.log('Connecté à MongoDB.');
});