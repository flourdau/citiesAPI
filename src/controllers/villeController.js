// src/controllers/villeController.js
const Ville = require('../models/Ville');

// Fonction pour obtenir toutes les villes (avec pagination optionnelle)
exports.getAllVilles = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const totalVilles = await Ville.countDocuments();
        const villes = await Ville.find()
                                   .skip(skip)
                                   .limit(limit)
                                   .lean(); // .lean() pour obtenir des objets JavaScript simples, plus rapides

        const results = {};
        if (page * limit < totalVilles) {
            results.next = {
                page: page + 1,
                limit: limit
            };
        }
        if (skip > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            };
        }

        results.total = totalVilles;
        results.data = villes;
        res.json(results);
    } catch (error) {
        console.error("Erreur lors de la récupération des villes paginées:", error);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des villes.' });
    }
};

// Fonction pour obtenir toutes les villes sans limites
exports.getAllVillesNoLimit = async (req, res) => {
    try {
        const villes = await Ville.find().lean();
        res.json(villes);
    } catch (error) {
        console.error("Erreur lors de la récupération de toutes les villes sans limite:", error);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération de toutes les villes.' });
    }
};

// Fonction pour obtenir une ville par son code postal ou nom
exports.getVilleByQuery = async (req, res) => {
    const query = req.params.query; // MongoDB gère la case-insensibilité avec les index textuels ou des regex
    try {
        const filteredVilles = await Ville.find({
            $or: [
                { code_postal: { $regex: query, $options: 'i' } }, // Recherche insensible à la casse
                { nom_de_la_commune: { $regex: query, $options: 'i' } }
                // Si vous avez créé un index textuel, vous pouvez utiliser:
                // { $text: { $search: query } }
                // Note: La recherche textuelle est plus complexe à utiliser avec $or et d'autres critères.
                // Les regex ($options: 'i') sont souvent suffisantes pour de petites recherches simples.
            ]
        }).lean();

        if (filteredVilles.length > 0) {
            res.json(filteredVilles);
        } else {
            res.status(404).json({ message: 'Ville(s) non trouvée(s).' });
        }
    } catch (error) {
        console.error("Erreur lors de la recherche des villes:", error);
        res.status(500).json({ message: 'Erreur serveur lors de la recherche.' });
    }
};

// Fonction pour obtenir une ville par son code INSEE
exports.getVilleByInseeCode = async (req, res) => {
    const codeInsee = req.params.codeInsee;
    try {
        const ville = await Ville.findOne({ code_commune_insee: codeInsee }).lean();

        if (ville) {
            res.json(ville);
        } else {
            res.status(404).json({ message: 'Ville non trouvée.' });
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de la ville par code INSEE:", error);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération.' });
    }
};