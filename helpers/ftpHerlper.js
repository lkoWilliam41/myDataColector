// ftpHelper.js

const ftpClient = require('ftp');

async function fetchDataFromFTP(ftpConfig) {
  const client = new ftpClient();
  
  return new Promise((resolve, reject) => {
    client.connect(ftpConfig);
    
    client.on('ready', () => {
      client.get(ftpConfig.source, (err, stream) => {
        if (err) {
          reject(new Error(`Erreur lors de la récupération des données depuis le serveur FTP : ${err.message}`));
        } else {
          stream.once('close', () => client.end());
          resolve(stream);
        }
      });
    });
  });
}

module.exports = { fetchDataFromFTP };
