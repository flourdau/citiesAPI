const express = require('express');
const cors = require('cors');
const villesRoutes = require('./routes/villes');
const dataService = require('./services/dataService');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour analyser le corps des requêtes en JSON
app.use(express.json());

// Middleware CORS pour autoriser les requêtes cross-origin
app.use(cors());

// Définition des routes de l'API
app.use('/api/villes', villesRoutes);

// Route par défaut pour vérifier si l'API est en ligne
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API des villes de France !');
});

// Gestion des erreurs 404 (route non trouvée)
app.use((req, res, next) => {
    res.status(404).send("Désolé, la page demandée n'existe pas.");
});

// Démarrage du serveur après le chargement des données
dataService.loadVillesData()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Serveur API démarré sur http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error('Échec du démarrage de l\'API en raison d\'une erreur de chargement des données:', error);
        process.exit(1); // Arrête le processus si les données ne peuvent pas être chargées
    });