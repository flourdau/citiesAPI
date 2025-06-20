// app.js
const express = require('express');
const cors = require('cors');
const { loadCities, getCities, getCityById, searchCities } = require('./data'); // Importez vos fonctions de données

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Permet les requêtes CORS
app.use(express.json()); // Pour parser les corps de requêtes JSON (utile pour POST/PUT/PATCH)

// Routes de l'API

// GET /api/cities - Récupérer toutes les villes (avec pagination/recherche à ajouter plus tard)
app.get('/api/cities', (req, res) => {
    const { search } = req.query; // Récupère le paramètre de recherche depuis l'URL (ex: /api/cities?search=paris)
    let citiesData = getCities();

    if (search) {
        citiesData = searchCities(search);
    }

    res.json(citiesData);
});

// app.js
// ... (imports et setup de base restent les mêmes)

// GET /api/cities - Récupérer toutes les villes (avec recherche et pagination)
app.get('/api/cities', async (req, res) => {
    try {
        const { search, limit = 10, page = 1 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        let query = {};
        if (search) {
            query = {
                $or: [
                    { Nom_de_la_commune: { $regex: search, $options: 'i' } },
                    { Code_postal: { $regex: search, $options: 'i' } },
                    { Code_commune_INSEE: { $regex: search, $options: 'i' } }
                    // Ajoutez d'autres champs si vous voulez qu'ils soient recherchables
                ]
            };
        }

        const cities = await City.find(query)
                                 .limit(parseInt(limit))
                                 .skip(skip);

        const totalCities = await City.countDocuments(query);

        res.json({
            data: cities,
            total: totalCities,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(totalCities / parseInt(limit))
        });

    } catch (error) {
        console.error('Erreur lors de la récupération des villes :', error);
        res.status(500).json({ message: 'Erreur serveur interne' });
    }
});

// ... (les routes POST, PUT, DELETE nécessiteront d'adapter les noms de champs dans req.body
// pour correspondre au nouveau schéma, ex: req.body.Nom_de_la_commune)

// Exemple pour POST:
app.post('/api/cities', async (req, res) => {
    try {
        const lastCity = await City.findOne().sort({ id: -1 });
        const newId = lastCity ? lastCity.id + 1 : 1;

        // Assurez-vous que les noms des champs ici correspondent exactement à votre schéma
        const newCity = new City({
            id: newId,
            Code_commune_INSEE: req.body.Code_commune_INSEE,
            Nom_de_la_commune: req.body.Nom_de_la_commune,
            Code_postal: req.body.Code_postal,
            Libelle_d_acheminement: req.body.Libelle_d_acheminement,
            Ligne_5: req.body.Ligne_5
        });

        await newCity.save();
        res.status(201).json(newCity);
    } catch (error) {
        console.error('Erreur lors de la création de la ville :', error);
        res.status(500).json({ message: 'Erreur lors de la création de la ville', error: error.message });
    }
});

// ... (Les routes PUT et DELETE restent similaires, mais assurez-vous que le corps de la requête
// PUT envoie les bons noms de champs selon votre schéma)

// Démarrage du serveur (inchangé)
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
    console.log(`Accédez à l'API : http://localhost:${PORT}/api/cities`);
});

// Démarrage du serveur après le chargement des données
loadCities()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur le port ${PORT}`);
            console.log(`Accédez à l'API : http://localhost:${PORT}/api/cities`);
        });
    })
    .catch(error => {
        console.error("Échec du démarrage de l'API en raison d'une erreur de chargement des données :", error);
    });