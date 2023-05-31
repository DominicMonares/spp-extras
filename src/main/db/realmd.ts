import { send } from '../../utils';

// ----------------------------------------------------------------
// Accounts
// ----------------------------------------------------------------

export const selPlayerAccts = async (conn: any, reply?: any) => { // TEMP ANY
  const sql = `
    SELECT id, username FROM account
    WHERE username NOT LIKE "%RNDBOT%"
  `;
  try {
    const startMsg = 'Fetching player account data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql);
    const successMsg = 'Player account data fetched!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to fetch player account data!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}

export const selBotAccts = async (conn: any, reply?: any) => { // TEMP ANY
  const sql = `
    SELECT id, username FROM account
    WHERE username LIKE "%RNDBOT%"
  `;
  try {
    const startMsg = 'Fetching bot account data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql);
    const successMsg = 'Bot account data fetched!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to fetch bot account data!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}
