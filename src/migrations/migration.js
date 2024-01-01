import { ObjectId } from 'mongodb';
import farmerSlavery from './data-source/1_db_slavery.js';

async function _createGlobal(array, collection) {
  await Promise.all(
    array.map(async (data) => {
      const result = await global.db.collection(collection).findOne({ _id: new ObjectId(`${data._id}`) });
      if (result === null) {
        data._id = new ObjectId(`${data._id}`);
        return await global.db.collection(collection).insertOne(data);
      }
    })
  );
}

async function migrateData(migrateType, insertFunction) {
  if (!(await global.db.collection('migration').findOne({ migrate: migrateType }))) {
    await insertFunction();
    await global.db.collection('migration').insertOne({ migrate: migrateType, run_date: new Date() });
  }
}

async function insertFarmerSlavery() {
  console.log('--------------------------------------------');
  console.log('1 - Inserindo lista de trabalho escravo');
  await _createGlobal(farmerSlavery, 'slavery');
  console.log('--------------------------------------------');
}


export const runMigrate = async () => {
  console.log('0 - Iniciando Migração');

  // Primeiro parametro: Nome da Collection
  // Segundo paramentro: Função de Migrate
  await migrateData('slavery', insertFarmerSlavery);
  console.log('Migração Finalizada');
};
