// dataModel.js

const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  // Définir la structure de votre modèle de données MongoDB
});

const DataModel = mongoose.model('Data', dataSchema);

module.exports = DataModel;
