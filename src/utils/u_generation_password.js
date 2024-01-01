import bcrypt from 'bcrypt';

export const generatePassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, 5);
    return hash;
  } catch (err) {
    throw new Error("Erro ao gerar hash da senha.");
  }
};
