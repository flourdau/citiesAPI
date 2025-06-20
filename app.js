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

// GET /api/cities/:id - Récupérer une ville par son ID
app.get('/api/cities/:id', (req, res) => {
    const city = getCityById(req.params.id);
    if (city) {
        res.json(city);
    } else {
        res.status(404).json({ message: 'Ville non trouvée' });
    }
});

// Ajoutez d'autres routes si nécessaire (POST, PUT, DELETE - pour l'exercice, GET est suffisant)
// Exemple pour POST (créer une ville - nécessite une gestion de persistance des données)
/*
app.post('/api/cities', (req, res) => {
    const newCity = req.body; // Supposons que le corps de la requête contient les données de la nouvelle ville
    // Ici, vous devriez ajouter la logique pour ajouter la ville à votre tableau 'cities'
    // et lui attribuer un ID unique. Pour un fichier CSV, cela ne sera pas persistant.
    // Pour la persistance, il faudrait une base de données.
    newCity.id = getCities().length > 0 ? Math.max(...getCities().map(c => c.id)) + 1 : 1;
    getCities().push(newCity); // Attention : cela modifie le tableau en mémoire
    res.status(201).json(newCity); // 201 Created
});
*/


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