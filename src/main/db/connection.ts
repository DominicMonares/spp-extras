import mysql from 'mysql2/promise';

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
    if (reply) reply(startMsg);
    else console.log(startMsg);
    const connection = await mysql.createConnection(settings);
    const successMsg = `Connected to ${xpac}${db}!`;
    if (reply) reply(successMsg);
    else console.log(successMsg);
    return connection;
  } catch (err) {
    const errMsg = `Failed to connect to ${xpac}${db}!\n${err}`;
    if (reply) reply(errMsg);
    else console.error(errMsg);
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
    if (reply) reply(startMsg);
    else console.log(startMsg);
    await connection.end();
    const successMsg = `Disconnected from ${xpac}${db}!`;
    if (reply) reply(successMsg);
    else console.log(successMsg);
  } catch (err) {
    const errMsg = `Failed to disconnect from ${xpac}${db}!\n${err}`;
    if (reply) reply(errMsg);
    else console.log(errMsg);
    throw err;
  }
}
