import { send } from '../../../utils';
import {
  Connection,
  Reply,
  ReputationValues,
} from '../../../types';

// ----------------------------------------------------------------
// Reputation
// ----------------------------------------------------------------

export const selCharRep = async (
  conn: Connection,
  charIDs: number[],
  reply?: Reply
) => {
  const sql = `
    SELECT * FROM character_reputation
    WHERE guid IN (?)
  `;
  try {
    const startMsg = 'Fetching character reputation data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [charIDs]);
    const successMsg = 'Character reputation data fetched!';
    send(successMsg, reply);
    return JSON.parse(JSON.stringify(rows));
  } catch (err) {
    const errMsg = `Failed to fetch character reputation data!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}

export const updCharRep = async (
  conn: Connection,
  reputations: ReputationValues,
  reply?: Reply
) => {
  const values = reputations.map(r => [r.guid, r.faction, r.standing, r.flags]);
  const sql = `
    INSERT INTO characters (guid, faction, standing, flags) VALUES ?
      ON DUPLICATE KEY UPDATE standing=VALUES(standing)
  `;
  try {
    const startMsg = 'Updating character reputation standings...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [values]);
    const successMsg = 'Character reputation standings updated!';
    send(successMsg, reply);
    return JSON.parse(JSON.stringify(rows));
  } catch (err) {
    const errMsg = `Failed to update character reputation standings!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}
