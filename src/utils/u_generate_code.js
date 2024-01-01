import { randomInt } from 'crypto';
const COLLECTION = 'qualquer';

// Esse método eu deixei ele aqui para caso precise gerar um código unico para ser usado em algum lugar
// Ajuste a collection e o campo que vc precisa olhar no banco
export const generateUniqueCode = async () => {
  try {
    let isUnique = false;
    let uniqueCode;

    while (!isUnique) {
      uniqueCode = randomInt(10000, 99999).toString();
      const existingCode = await global.db.collection(COLLECTION).findOne({ field: uniqueCode });
      if (!existingCode) {
        isUnique = true;
      }
    }
    return uniqueCode;
  } catch (err) {
    throw new Error("Erro ao gerar código único.");
  }
};
