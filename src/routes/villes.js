const express = require('express');
const router = express.Router();
const villeController = require('../controllers/villeController');
const { protect, authorize } = require('../middleware/authMiddleware'); // Importe les middlewares

// --- READ Routes (accessibles à tous, même non authentifiés) ---
router.get('/all', villeController.getAllVillesNoLimit);
router.get('/', villeController.getAllVilles);
router.get('/search/:query', villeController.getVilleByQuery);
router.get('/:codeInsee', villeController.getVilleByInseeCode);

// --- CRUD Routes Protégées (nécessitent authentification et rôle 'admin') ---
// Toutes ces routes passeront d'abord par `protect` pour vérifier le token,
// puis par `authorize('admin')` pour vérifier le rôle de l'utilisateur.

// POST /api/villes (Créer une nouvelle ville)
router.post('/', protect, authorize('admin'), villeController.createVille);

// PUT /api/villes/:codeInsee (Mettre à jour une ville)
router.put('/:codeInsee', protect, authorize('admin'), villeController.updateVille);

// DELETE /api/villes/:codeInsee (Supprimer une ville)
router.delete('/:codeInsee', protect, authorize('admin'), villeController.deleteVille);

module.exports = router;


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