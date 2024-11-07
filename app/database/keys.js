import { initDb } from './db';

let dbPromise;

// Inicializar o banco de dados se necessário
const getDbInstance = async () => {
  if (!dbPromise) {
    dbPromise = initDb();
  }
  return await dbPromise;
};

// Cadastrar uma nova chave
export const insertKey = async (number) => {
  try {
    const db = await getDbInstance();
    await db.runAsync(
      'INSERT INTO keys (number) VALUES (?);',
      [number]
    );
    console.log("Chave inserida com sucesso");
  } catch (error) {
    console.error("Erro ao inserir chave:", error);
  }
};

// Atualizar o número de uma chave existente
export const updateKey = async (keyId, number) => {
  try {
    const db = await getDbInstance();
    await db.runAsync(
      'UPDATE keys SET number = ? WHERE id = ?;',
      [number, keyId]
    );
    console.log(`Chave ${keyId} atualizada com sucesso`);
  } catch (error) {
    console.error("Erro ao atualizar a chave:", error);
  }
};

// Excluir uma chave
export const deleteKey = async (keyId) => {
  try {
    const db = await getDbInstance();
    await db.runAsync('DELETE FROM keys WHERE id = ?;', [keyId]);
    console.log(`Chave ${keyId} deletada com sucesso`);
  } catch (error) {
    console.error("Erro ao deletar chave:", error);
  }
};

// Buscar uma chave específica pelo ID
export const getKeyById = async (keyId) => {
  try {
    const db = await getDbInstance();
    const result = await db.getFirstAsync('SELECT * FROM keys WHERE id = ?;', [keyId]);
    return result;
  } catch (error) {
    console.error("Erro ao buscar chave pelo ID:", error);
    return null; // Retorna `null` em caso de erro
  }
};

// Buscar todas as chaves
export const getAllKeys = async () => {
  try {
    const db = await getDbInstance();
    const result = await db.getAllAsync('SELECT * FROM keys;');
    return result;
  } catch (error) {
    console.error("Erro ao buscar todas as chaves:", error);
    return []; // Retorna um array vazio em caso de erro
  }
};

// Registrar um empréstimo, vinculando a chave ao usuário
export const registerLoan = async (keyId, userId) => {
  try {
    const db = await getDbInstance();
    await db.runAsync(
      'UPDATE keys SET user = ?, date = CURRENT_TIMESTAMP WHERE id = ?;',
      [userId, keyId]
    );
    console.log(`Empréstimo registrado: chave ${keyId} para usuário ${userId}`);
  } catch (error) {
    console.error("Erro ao registrar empréstimo:", error);
  }
};

// Devolver a chave, removendo o vínculo com o usuário
export const returnKey = async (keyId) => {
  try {
    const db = await getDbInstance();
    await db.runAsync(
      'UPDATE keys SET user = NULL, date = CURRENT_TIMESTAMP WHERE id = ?;',
      [keyId]
    );
    console.log(`Chave ${keyId} devolvida com sucesso`);
  } catch (error) {
    console.error("Erro ao devolver chave:", error);
  }
};

