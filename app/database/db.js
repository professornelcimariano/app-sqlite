// expo install expo-sqlite
import * as SQLite from 'expo-sqlite';

const initDb = async () => {
  const db = await SQLite.openDatabaseAsync('appsqlite.db');  
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS keys (id INTEGER PRIMARY KEY, number INTEGER, user INTEGER, date timestamp DEFAULT CURRENT_TIMESTAMP);
    
    `);
  return db;
};

export { initDb };
  // ATENÇÃO: Ao executar o insert, cada vez que salva o código, ele insere um novo registro.
  // DELETE FROM items; // Limpa a tabela
  // INSERT INTO items (value, intValue) VALUES ('Item 1', 100);
  // DROP TABLE IF EXISTS items; // Apaga a tabela

// await db.execAsync(`
  //   PRAGMA journal_mode = WAL;
  //   DROP TABLE IF EXISTS items;
  //   CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, value TEXT, intValue INTEGER);
  //   INSERT INTO items (value, intValue) VALUES ('Item 1', 100);
  // `);

