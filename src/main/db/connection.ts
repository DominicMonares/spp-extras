import mysql from 'mysql2/promise';
import { send } from '../../utils';
import { ConnectionPool, Expansion, Reply } from 'types';

export const connect = async (
  xpac: Expansion,
  db: string,
  reply?: Reply,
) => {
  const settings = {
    host: 'localhost',
    port: 3310,
    user: 'root',
    password: '123456',
    database: `${xpac}${db}`,
  };
  try {
    const startMsg = `Connecting to ${xpac}${db}...`;
    send(startMsg, reply);
    const connection = await mysql.createConnection(settings);
    const successMsg = `Connected to ${xpac}${db}!`;
    send(successMsg, reply);
    return connection;
  } catch (err) {
    const errMsg = `Failed to connect to ${xpac}${db}!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}

export const disconnect = async (
  connections: ConnectionPool,
  xpac: Expansion,
  reply?: Reply,
) => {
  for (const conn of connections) {
    const connection = conn[0];
    const db = conn[1];
    try {
      const startMsg = `Disconnecting from ${xpac}${db}...`;
      send(startMsg, reply);
      await connection.end();
      const successMsg = `Disconnected from ${xpac}${db}!`;
      send(successMsg, reply);
    } catch (err) {
      const errMsg = `Failed to disconnect from ${xpac}${db}!\n${err}`;
      send(errMsg, reply);
      throw errMsg;
    }
  }
}
