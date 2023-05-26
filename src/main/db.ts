import mysql from 'mysql2/promise';

export const connection = async () => {
  const conn = await mysql.createConnection({
    host: 'localhost',
    port: 3310,
    user: 'root',
    password: '123456',
    database: 'wotlkrealmd'
  });

  return conn;
};

export const testDb = async () => {
  const db = await connection();
  const [rows] = await db.execute('SELECT * FROM account');
  await db.end();
  return rows;
};
