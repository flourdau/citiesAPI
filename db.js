// db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI); // Pas besoin d'options pour les versions récentes de Mongoose
        console.log('Connexion à MongoDB réussie !');
    } catch (error) {
        console.error('Erreur de connexion à MongoDB :', error.message);
        process.exit(1);
    }
};

// Définition du Schéma pour les villes
const citySchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true }, // ID ajouté pour la gestion interne de l'API
    Code_commune_INSEE: { type: String, required: true },
    Nom_de_la_commune: { type: String, required: true },
    Code_postal: { type: String, required: true },
    Libelle_d_acheminement: { type: String },
    Ligne_5: { type: String } // Ce champ semble optionnel, mais je l'inclus
});

// Création du Modèle "City"
const City = mongoose.model('City', citySchema);

module.exports = {
    connectDB,
    City
};