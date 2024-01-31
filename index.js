// index.js

// Importer les modules nécessaires
const { program } = require('commander');
const retrieveCommand = require('./commands/retrieve');
const sendCommand = require('./commands/send');

// Configurer les commandes de la ligne de commande
program.addCommand(retrieveCommand);
program.addCommand(sendCommand);

// Analyser les arguments de la ligne de commande
program.parse(process.argv);
