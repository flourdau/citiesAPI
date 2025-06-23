const dataService = require('../services/dataService');

// Fonction pour obtenir toutes les villes sans limite (pour des cas spécifiques)
exports.getAllVillesNoLimit = (req, res) => {
    const villes = dataService.getVilles();
    res.json(villes);
};

// Fonction pour obtenir toutes les villes (avec pagination optionnelle)
exports.getAllVilles = (req, res) => {
    const villes = dataService.getVilles();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < villes.length) {
        results.next = {
            page: page + 1,
            limit: limit
        };
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        };
    }

    results.total = villes.length;
    results.data = villes.slice(startIndex, endIndex);
    res.json(results);
};

// Fonction pour obtenir une ville par son code postal ou nom
exports.getVilleByQuery = (req, res) => {
    const query = req.params.query.toLowerCase();
    const villes = dataService.getVilles();

    const filteredVilles = villes.filter(ville =>
        ville.code_postal.includes(query) ||
        ville.nom_de_la_commune.toLowerCase().includes(query)
    );

    if (filteredVilles.length > 0) {
        res.json(filteredVilles);
    } else {
        res.status(404).json({ message: 'Ville(s) non trouvée(s).' });
    }
};

// Fonction pour obtenir une ville par son code INSEE
exports.getVilleByInseeCode = (req, res) => {
    const codeInsee = req.params.codeInsee;
    const villes = dataService.getVilles();

    const ville = villes.find(v => v.code_commune_insee === codeInsee);

    if (ville) {
        res.json(ville);
    } else {
        res.status(404).json({ message: 'Ville non trouvée.' });
    }
};