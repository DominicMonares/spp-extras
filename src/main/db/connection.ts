import mysql from 'mysql2/promise';
import { dbReply } from '../../utils';

export const connect = async (xpac: string, db: string, reply?: any) => { // TEMP TYPES
  const settings = {
    host: 'localhost',
    port: 3310,
    user: 'root',
    password: '123456',
    database: `${xpac}${db}`
  };
  try {
    const startMsg = `Connecting to ${xpac}${db}...`;
    dbReply(startMsg, reply);
    const connection = await mysql.createConnection(settings);
    const successMsg = `Connected to ${xpac}${db}!`;
    dbReply(successMsg, reply);
    return connection;
  } catch (err) {
    const errMsg = `Failed to connect to ${xpac}${db}!\n${err}`;
    dbReply(errMsg, reply);
    throw err;
  }
}

export const disconnect = async ( // TEMP ANY
  connection: any,
  xpac: string,
  db: string,
  reply?: any
) => {
  try {
    const startMsg = `Disconnecting from ${xpac}${db}...`;
    dbReply(startMsg, reply);
    await connection.end();
    const successMsg = `Disconnected from ${xpac}${db}!`;
    dbReply(successMsg, reply);
  } catch (err) {
    const errMsg = `Failed to disconnect from ${xpac}${db}!\n${err}`;
    dbReply(errMsg, reply);
    throw err;
  }
}
