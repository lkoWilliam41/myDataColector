// retrieve.js

const { Command } = require('commander');
const { fetchDataFromFTP } = require('../helpers/ftpHelper');
const { fetchDataFromRSS } = require('../helpers/rssHelper');
const { fetchDataFromAPI } = require('../helpers/apiHelper');

const retrieveCommand = new Command('retrieve')
  .description('Commande de récupération des données')
  .argument('<source>', 'La source des données')
  .argument('<destination>', 'La destination des données')
  .action(async (source, destination) => {
    try {
      if (source.startsWith('ftp://')) {
        await fetchDataFromFTP(source, destination);
      } else if (source.startsWith('http://') || source.startsWith('https://')) {
        await fetchDataFromAPI(source, destination);
      } else if (source.startsWith('rss://')) {
        await fetchDataFromRSS(source, destination);
      } else {
        throw new Error('Source de données non prise en charge');
      }
      console.log('Données récupérées avec succès');
    } catch (error) {
      console.error(`Erreur lors de la récupération des données : ${error.message}`);
    }
  });

module.exports = retrieveCommand;
