// src/models/Ville.js
const mongoose = require('mongoose');

const villeSchema = new mongoose.Schema({
    code_commune_insee: { type: String, required: true, unique: true },
    nom_de_la_commune: { type: String, required: true },
    code_postal: { type: String, required: true },
    libelle_d_acheminement: { type: String },
    ligne_5: { type: String },
    _geopoint: { type: [Number], index: '2dsphere' }, // [longitude, latitude] pour GeoJSON Point
    latitude: { type: Number },
    longitude: { type: Number }
}, {
    timestamps: false // Pas besoin de createdAt/updatedAt si non pertinent
});

// Créer un index de texte sur le nom de la commune pour des recherches efficaces
villeSchema.index({ nom_de_la_commune: 'text' });
villeSchema.index({ code_postal: 1 }); // Index simple sur le code postal

module.exports = mongoose.model('Ville', villeSchema, 'villes'); // 'villes' est le nom de votre collection