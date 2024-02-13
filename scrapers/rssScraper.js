const Parser = require('rss-parser');
const fs = require('fs');

// Tableau contenant les URLs des flux RSS à récupérer
const rssData = require('../Data/rssdata.json').rssData;

async function scrapeRssFeeds() {
    const parser = new Parser();
    const allFeedItems = [];

    for (const feedUrl of rssData) {
        try {
            const feed = await parser.parseURL(feedUrl);
            const feedItems = feed.items.map(item => ({
                title: item.title,
                link: item.link
            }));
            allFeedItems.push({ feedUrl, feedItems });
        } catch (error) {
            console.error(`Error scraping RSS feed ${feedUrl}:`, error);
        }
    }

    return allFeedItems; // Retourne le tableau contenant tous les éléments des flux RSS
}

scrapeRssFeeds().then((allData) => {
    const jsonData = JSON.stringify(allData, null, 2); // Convertit le tableau en JSON avec une indentation de 2 espaces
    fs.writeFileSync('rss_data.json', jsonData); // Écrit le JSON dans un fichier
    console.log('RSS feed data extracted and saved to rss_data.json');
}).catch((error) => {
    console.error('Error scraping RSS feeds:', error);
});

module.exports = {
    scrapeRssFeeds
}