import { send } from '../../../utils';
import { Connection, Reply } from '../../../types';

// ----------------------------------------------------------------
// Accounts
// ----------------------------------------------------------------

export const selAccts = async (conn: Connection, bots: boolean, reply?: Reply) => {
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
    return JSON.parse(JSON.stringify(rows));
  } catch (err) {
    const errMsg = `Failed to fetch account data!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}
