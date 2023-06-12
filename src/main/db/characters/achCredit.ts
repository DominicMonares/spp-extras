import { send } from '../../../utils';
import { Connection, CreditValues, Reply } from 'types';

// ----------------------------------------------------------------
// Achievement Credit
// ----------------------------------------------------------------

export const selAchCredit = async (
  conn: Connection,
  charIDs: number[],
  reply?: Reply,
) => {
  const sql = `
    SELECT * FROM character_achievement
    WHERE guid IN (?)
  `;
  try {
    const startMsg = 'Fetching character achievement credit data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [charIDs]);
    const successMsg = 'Failed to fetch character achievement credit data!';
    send(successMsg, reply);
    return JSON.parse(JSON.stringify(rows));
  } catch (err) {
    const errMsg = `Failed to fetch character achievement credit data!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}

export const insCharAchs = async (
  conn: Connection,
  achCredit: CreditValues,
  reply?: Reply,
) => {
  const columns = 'guid, achievement, date';
  const values = achCredit.map(a =>[a.guid, a.achievement, a.date]);
  const sql = `INSERT IGNORE INTO character_achievement (${columns}) VALUES ?`;
  try {
    const startMsg = 'Saving new character achievement credit...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [values]);
    const successMsg = 'New character achievement credit successfully saved!';
    send(successMsg, reply);
    return JSON.parse(JSON.stringify(rows));
  } catch (err) {
    const errMsg = `Failed to save new character achievement credit!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}
