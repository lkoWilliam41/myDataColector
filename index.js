// index.js

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const websites = require('./Data/dataWebsite.json').websites;

async function scrapeWebsite(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        
        const extractedData = {
            url: url,
            paragraphs:[],
            links:[],
            h1Titles:[]
        };

        // Récupération des paragraphes
        $('p').each((index,element)=>{
            extractedData.paragraphs.push($(element).text());
        });

        //Récupération des Grands Titres
        $('h1').each((index,element)=>{
            extractedData.paragraphs.push($(element).text());
        });

        //Récupération des liens
        $('a').each((index, element)=>{
            extractedData.paragraphs.push($(element).text())
        })

        return extractedData; // Retourne les données extraites
    } catch (error) {
        console.error('Error scraping website:', error);
        return null; // Retourne un tableau vide en cas d'erreur
    }
}

async function scrapeAllWebsites() {
    const allExtractedData = [];

    for (const url of websites) {
        const extractedData = await scrapeWebsite(url);
        if (extractedData){
            allExtractedData.push(extractedData); // Ajoute les données extraites avec l'URL correspondante
        }
    }

    return allExtractedData; // Retourne le tableau contenant toutes les données extraites
}

scrapeAllWebsites().then((allData) => {
    const jsonData = JSON.stringify(allData, null, 2); // Convertit le tableau en JSON avec une indentation de 2 espaces
    fs.writeFileSync('extracted_data.json', jsonData); // Écrit le JSON dans un fichier
    console.log('Data extracted and saved to extracted_data.json');
}).catch((error) => {
    console.error('Error scraping all websites:', error);
});

