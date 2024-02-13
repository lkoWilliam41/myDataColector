const fs = require('fs');
const websiteScraper = require('./scrapers/websiteScraper');
const rssScraper = require('./scrapers/rssScraper');

// Fonction principale pour exécuter les scrapers
async function runScrapers() {
    try {
        // Exécution du scraper pour les sites web et sauvegarder les données
        const websiteData = await websiteScraper.scrapeAllWebsites();
        fs.writeFileSync('website_data.json', JSON.stringify(websiteData, null, 2));
        console.log('Data recupérées et sauvegarde dans website_data.json');

        // Exécution du scraper pour les flux RSS et sauvegarder les données
        const rssData = await rssScraper.scrapeRssFeeds();
        fs.writeFileSync('rss_data.json', JSON.stringify(rssData, null, 2));
        console.log('Flux RSS recupéré et sauvegarde dans rss_data.json');
    } catch (error) {
        console.error('Error running scrapers:', error);
    }
}

// Appele de  la fonction principale
runScrapers();
