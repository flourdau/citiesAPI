const express = require('express');
const router = express.Router();
const villeController = require('../controllers/villeController');

// GET /api/villes/all
router.get('/all', villeController.getAllVillesNoLimit);

// Route pour obtenir toutes les villes (avec pagination)
// GET /api/villes?page=1&limit=10
router.get('/', villeController.getAllVilles);

// Route pour obtenir des villes par code postal ou nom (recherche textuelle)
// GET /api/villes/search/:query
router.get('/search/:query', villeController.getVilleByQuery);

// Route pour obtenir une ville par son code INSEE
// GET /api/villes/:codeInsee
router.get('/:codeInsee', villeController.getVilleByInseeCode);


// --- CREATE Route ---
// POST /api/villes
router.post('/', villeController.createVille);

// --- UPDATE Route ---
// PUT /api/villes/:codeInsee
// Utilisez PUT si vous voulez remplacer entièrement un document.
router.put('/:codeInsee', villeController.updateVille);

// --- DELETE Route ---
// DELETE /api/villes/:codeInsee
router.delete('/:codeInsee', villeController.deleteVille);

module.exports = router;