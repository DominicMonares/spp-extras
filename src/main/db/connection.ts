import mysql from 'mysql2/promise';

export const connect = async (xpac: string, db: string) => { // TEMP TYPES
  const settings = {
    host: 'localhost',
    port: 3310,
    user: 'root',
    password: '123456',
    database: `${xpac}${db}`
  };

  try {
    console.log(`Connecting to ${xpac}${db}...`);
    const connection = await mysql.createConnection(settings);
    console.log(`Connected to ${xpac}${db}!`);
    return connection;
  } catch (err) {
    err = `Failed to connect to ${xpac}${db}!\n${err}`;
    console.error(err);
    throw err;
  }
}

export const disconnect = async (connection: any, xpac: string, db: string) => { // TEMP ANY
  try {
    console.log(`Disconnecting from ${xpac}${db}...`);
    await connection.end();
    console.log(`Disconnected from ${xpac}${db}!`);
  } catch (err) {
    err = `Failed to disconnect from ${xpac}${db}!\n${err}`;
    console.error(err);
    throw err;
  }
}
