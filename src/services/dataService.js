const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

let villesData = [];

async function loadVillesData() {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, '../../data/villes_france.csv');
        console.log(`Chargement des données depuis : ${filePath}`); // Pour le débogage
        fs.createReadStream(filePath)
            .pipe(csv({ separator: ',' })) // Spécifiez le séparateur si nécessaire
            .on('data', (row) => {
                // Nettoyage des données si nécessaire (ex: conversion en nombre)
                row.latitude = parseFloat(row.latitude);
                row.longitude = parseFloat(row.longitude);
                villesData.push(row);
            })
            .on('end', () => {
                console.log(`Données de ${villesData.length} villes chargées.`);
                resolve(villesData);
            })
            .on('error', (error) => {
                console.error(`Erreur lors du chargement du fichier CSV: ${error.message}`);
                reject(error);
            });
    });
}

function getVilles() {
    return villesData;
}

module.exports = {
    loadVillesData,
    getVilles
};