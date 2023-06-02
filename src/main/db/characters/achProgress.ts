import { send } from '../../../utils';
import {
  Connection,
  CharProgValues,
  Reply,
} from '../../../types';

// ----------------------------------------------------------------
// Achievement Progress
// ----------------------------------------------------------------

export const selAchProg = async (
  conn: Connection,
  charIDs: number[],
  reply?: Reply
) => {
  const sql = `
    SELECT * FROM character_achievement_progress
    WHERE guid IN (?)
  `;
  try {
    const startMsg = 'Fetching character achievement progress data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [charIDs]);
    const successMsg = 'Character achievement progress data fetched!';
    send(successMsg, reply);
    return JSON.parse(JSON.stringify(rows));
  } catch (err) {
    const errMsg = `Failed to fetch character achievement progress data!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}

export const insUpdAchProg = async (
  conn: Connection,
  achProg: CharProgValues,
  reply?: Reply
) => {
  const columns = 'guid, criteria, counter, date';
  const values = achProg.map(a => {
    return [a.guid, a.criteria, a.counter, a.date];
  });
  const sql = `
    INSERT INTO character_achievement_progress (${columns}) VALUES ?
      ON DUPLICATE KEY UPDATE counter=VALUES(counter), date=VALUES(date)
  `;
  try {
    const startMsg = 'Saving new character achievement progress...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [values]);
    const successMsg = 'New character achievement progress successfully saved!';
    send(successMsg, reply);
    return JSON.parse(JSON.stringify(rows));
  } catch (err) {
    const errMsg = `Failed to save new character achievement progress!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}
