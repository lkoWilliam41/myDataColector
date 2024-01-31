// apiHelper.js

const axios = require('axios');

async function fetchDataFromAPI(apiUrl) {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des données depuis l'API : ${error.message}`);
  }
}

module.exports = { fetchDataFromAPI };
