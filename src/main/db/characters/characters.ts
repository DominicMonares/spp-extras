import { send } from '../../../utils';
import {
  Connection,
  Expansion,
  Reply,
} from '../../../types';

// ----------------------------------------------------------------
// Characters
// ----------------------------------------------------------------

export const selChars = async (
  conn: Connection,
  xpac: Expansion,
  accts: number[],
  reply?: Reply
) => {
  const values = `
    guid,
    account,
    name,
    race,
    class
    ${xpac === 'wotlk' ? ', gender, knownTitles' : ''}
  `;
  const sql = `
    SELECT ${values} FROM characters
    WHERE account IN (?)
  `;
  try {
    const startMsg = 'Fetching character data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [accts]);
    const successMsg = 'Character data fetched!';
    send(successMsg, reply);
    return JSON.parse(JSON.stringify(rows));
  } catch (err) {
    const errMsg = `Failed to fetch character data!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}
