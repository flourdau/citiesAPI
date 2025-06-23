// src/config/db.js

// Pas besoin de 'require('dotenv').config()' ici si déjà fait dans app.js
// car les variables sont chargées globalement pour le processus Node.js.

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            // Options qui ne sont plus nécessaires avec les versions récentes de Mongoose
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
            // serverSelectionTimeoutMS: 20000, // Gardez si vous aviez des problèmes de timeout
            // socketTimeoutMS: 45000,         // Gardez si vous aviez des problèmes de timeout
        });
        console.log('Connexion à MongoDB établie avec succès.');
    } catch (error) {
        console.error(`Erreur de connexion à MongoDB : ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;