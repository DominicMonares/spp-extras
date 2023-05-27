import mysql from 'mysql2/promise';

export const connection = async (xpac: string, db: string) => {
  const conn = await mysql.createConnection({
    host: 'localhost',
    port: 3310,
    user: 'root',
    password: '123456',
    database: `${xpac}${db}`
  });

  return conn;
};
