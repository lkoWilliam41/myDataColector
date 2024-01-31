// rssHelper.js

const parser = require('rss-parser');

async function fetchDataFromRSS(rssUrl) {
  try {
    const feed = await parser.parseURL(rssUrl);
    return feed.items;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des données depuis le flux RSS : ${error.message}`);
  }
}

module.exports = { fetchDataFromRSS };
