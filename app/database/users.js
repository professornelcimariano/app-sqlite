import { initDb } from './db';

let dbPromise;

// Função para inicializar o banco de dados se necessário
const getDbInstance = async () => {
  if (!dbPromise) {
    dbPromise = initDb();
  }
  return await dbPromise;
};

// Função para inserir um novo usuário com nome e biometria (opcional)
export const insertUser = async (name, biometric = null) => {
  try {
    const db = await getDbInstance();
    await db.runAsync(
      'INSERT INTO users (name, biometric) VALUES (?, ?);',
      [name, biometric]
    );
    console.log("Usuário inserido com sucesso:", name);
  } catch (error) {
    console.error("Erro ao inserir usuário:", error);
  }
};

// Função para atualizar os dados biométricos de um usuário
export const updateUserBiometric = async (userId, biometric) => {
  try {
    const db = await getDbInstance();
    await db.runAsync(
      'UPDATE users SET biometric = ? WHERE id = ?;',
      [biometric, userId]
    );
    console.log(`Biometria do usuário ${userId} atualizada com sucesso`);
  } catch (error) {
    console.error("Erro ao atualizar a biometria do usuário:", error);
  }
};

// Função para deletar um usuário pelo ID
export const deleteUser = async (userId) => {
  try {
    const db = await getDbInstance();
    await db.runAsync('DELETE FROM users WHERE id = ?;', [userId]);
    console.log(`Usuário ${userId} deletado com sucesso`);
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
  }
};

// Função para buscar um usuário específico pelo ID
export const getUserById = async (userId) => {
  try {
    const db = await getDbInstance();
    const result = await db.getFirstAsync('SELECT * FROM users WHERE id = ?;', [userId]);
    return result;
  } catch (error) {
    console.error("Erro ao buscar usuário pelo ID:", error);
    return null; // Retorna `null` em caso de erro
  }
};

// Função para buscar todos os usuários
export const getAllUsers = async () => {
  try {
    const db = await getDbInstance();
    const result = await db.getAllAsync('SELECT * FROM users;');
    return result;
  } catch (error) {
    console.error("Erro ao buscar todos os usuários:", error);
    return []; // Retorna um array vazio em caso de erro
  }
};
