// data.js
const fs = require('fs');
const csv = require('csv-parser'); // <--- Correction ici !

let cities = [];

const loadCities = () => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream('./cities.csv')
            .pipe(csv({ headers: true })) // <--- Et ici, utilisez 'csv' (la variable que vous avez importée)
            .on('data', (data) => results.push(data))
            .on('end', () => {
                cities = results.map((city, index) => ({
                    id: index + 1, // Ajout d'un ID unique pour chaque ville
                    ...city
                }));
                console.log(`Chargement de ${cities.length} villes terminé.`);
                resolve(cities);
            })
            .on('error', (error) => {
                console.error("Erreur lors du chargement du CSV :", error);
                reject(error);
            });
    });
};

const getCities = () => cities;

const getCityById = (id) => cities.find(city => city.id === parseInt(id));

const searchCities = (query) => {
    const lowerQuery = query.toLowerCase();
    return cities.filter(city =>
        Object.values(city).some(value =>
            String(value).toLowerCase().includes(lowerQuery)
        )
    );
};


module.exports = {
    loadCities,
    getCities,
    getCityById,
    searchCities
};