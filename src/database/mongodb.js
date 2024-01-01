import { MongoClient } from 'mongodb';
import environments from '../enviroments.js';

let dbConnection = null;

export default async function getConnection() {
  if (!environments.CONNECTION_STRING || !environments.MONGO_BASE_NAME) {
    throw new Error('CONNECTION_STRING e MONGO_BASE_NAME não foi setada no arquivo de enviroments');
  }

  if (dbConnection) {
    return dbConnection;
  }

  const client = new MongoClient(environments.CONNECTION_STRING, {});

  try {
    await client.connect();
    dbConnection = client.db(environments.MONGO_BASE_NAME);
    global.db = dbConnection;
    return dbConnection;
  } catch (error) {
    console.error(`Erro ao conectar com o MongoDB: ${error}`);
    await client.close();
    throw error;
  }
}
