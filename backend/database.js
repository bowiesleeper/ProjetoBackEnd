const { MongoClient } = require('mongodb');
const { salvarLog } = require('./logger');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connect(collectionName) {
  try {
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
    }
    return client.db('ecommerce').collection(collectionName);
  } catch (error) {
    salvarLog(`Erro ao conectar ao MongoDB: ${error}`);
    throw error;
  }
}

module.exports = { connect };
