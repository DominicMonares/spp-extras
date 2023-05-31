import { send } from '../../utils';

// ----------------------------------------------------------------
// Accounts
// ----------------------------------------------------------------

export const selAccts = async (conn: any, bots: boolean, reply?: any) => { // TEMP ANY
  const sql = `
    SELECT id, username FROM account
    ${!bots ? 'WHERE username NOT LIKE "%RNDBOT%"' : ''}
  `;
  try {
    const startMsg = 'Fetching account data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql);
    const successMsg = 'Account data fetched!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to fetch account data!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}
