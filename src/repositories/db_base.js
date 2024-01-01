import InternalServerError from '../exceptions/InternalServerError.js';
const collectionName = 'base';


export const insert = async (base) => {
  try {
    return await global.db.collection(collectionName).insertOne(base);
  } catch (err) {
    throw new InternalServerError(err);
  }
};
