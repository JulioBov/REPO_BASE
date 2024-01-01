import pg from 'pg';
import environments from '../enviroments.js';

if (!environments.CONNECTION_STRING_PG) {
  throw new Error('CONNECTION_STRING_PG não foi setada no arquivo de enviroments');
}

const pool = new pg.Pool({
  connectionString: environments.CONNECTION_STRING_PG,
  ssl: { rejectUnauthorized: false },
});

pool.on('connect', () => {});

pool.on('error', (err) => {
  console.error('Erro no pool de conexões PostgreSQL:', err);
});

const query = async (text, params) => {
  try {
    return await pool.query(text, params);
  } catch (err) {
    console.error('Erro na consulta ao banco de dados:', err);
    throw err;
  }
};

export default { query };
