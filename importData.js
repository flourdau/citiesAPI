// importData.js
const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose'); // <--- ADD THIS LINE
const { connectDB, City } = require('./db');

require('dotenv').config();

const importCities = async () => {
    await connectDB();

    try {
        await City.deleteMany({});
        console.log('Collection City vidée.');

        const results = [];
        let currentId = 1;

        fs.createReadStream('./cities.csv')
            .pipe(csv({
                separator: ';',
                headers: true,
                mapHeaders: ({ header }) => {
                    let cleanedHeader = header.replace('#', '');
                    cleanedHeader = cleanedHeader
                        .replace(/ /g, '_')
                        .replace(/'/g, '')
                        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        .replace(/[^a-zA-Z0-9_]/g, '');
                    return cleanedHeader;
                }
            }))
            .on('data', (data) => {
                results.push({
                    id: currentId++,
                    Code_commune_INSEE: data.Code_commune_INSEE,
                    Nom_de_la_commune: data.Nom_de_la_commune,
                    Code_postal: data.Code_postal,
                    Libelle_d_acheminement: data.Libelle_d_acheminement,
                    Ligne_5: data.Ligne_5
                });
            })
            .on('end', async () => {
                try {
                    await City.insertMany(results, { ordered: false });
                    console.log(`${results.length} villes tentées d'importer dans MongoDB.`);
                    mongoose.connection.close(); // Now mongoose is defined
                } catch (error) {
                    console.error("Erreur lors de l'insertion des villes :", error);
                    if (error.writeErrors) {
                        console.error("Détails des erreurs d'écriture (ex: doublons, champs manquants) :", JSON.stringify(error.writeErrors, null, 2));
                    }
                    mongoose.connection.close(); // Now mongoose is defined
                }
            })
            .on('error', (error) => {
                console.error("Erreur lors de la lecture du CSV :", error);
                mongoose.connection.close(); // Now mongoose is defined
            });
    } catch (error) {
        console.error("Erreur lors de l'importation générale :", error);
        mongoose.connection.close(); // Now mongoose is defined
    }
};

importCities();