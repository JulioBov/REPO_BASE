import cors from 'cors';
import express from 'express';
import { CODES_HTTP } from '../enums/e_codes_http.js';
import enviroments from '../enviroments.js';
import NotFound from '../exceptions/NotFound.js';
import { runMigrate } from '../migrations/migration.js';
import exportError from './export_error.js';
import routers from './routers.js';

// Essa função garante que o Rafa não esqueceu de colocar nenhuma variavel de ambiente
function verifyEnv(env) {
  const missingKeys = [];
  for (const key in env) {
    if (!env[key]) {
      missingKeys.push(key);
    }
  }
  
  if (missingKeys.length > 0) {
    throw new Error(`Rafa, esta faltando as chaves: ${missingKeys.join(', ')}`);
  }
}


export default async function startup(api) {
  verifyEnv(enviroments);
  // Descomente abaixo se precisar usar o mongodb
  // await connection();

  // Carrega as informações base para o sistema, exemplo que deixei foi o de trabalho escravo
  await runMigrate();
  
  global.CODES_HTTP = CODES_HTTP;
  api.use(cors());
  api.use(express.urlencoded({ extended: true }));
  api.use(express.json());
  api.use(routers);

  api.get('/health', async (req, res) => {
    try {
      res.status(CODES_HTTP.OK).send({ message: `😁😁😁😁😁 Application running 😁😁😁😁😁` });
    } catch (err) {
      res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({ message: `🤢🤢🤢🤢🤢 Application is sick 🤢🤢🤢🤢🤢 | ${JSON.stringify(err)}` });
    }
  });

  api.use((req, res, next) => {
    next(new NotFound());
  });

  api.use((err, req, res, next) => {
    exportError(err, req, res, next);
  });
}
