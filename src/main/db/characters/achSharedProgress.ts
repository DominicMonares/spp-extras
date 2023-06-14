import { send } from '../../../utils';
import { Connection, Reply, SharedProgValues } from 'types';

// ----------------------------------------------------------------
// Achievement Shared Progress
// ----------------------------------------------------------------

export const showSharedProg = async (conn: Connection, reply?: Reply) => {
  const sql = 'SHOW TABLES LIKE "character_achievement_shared_progress"';
  try {
    const startMsg = 'Looking for shared achievement progress table...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql);
    const tableExists = Array.isArray(rows) && rows.length ? true : false;
    const existsMsg = 'Shared achievement progress table found!';
    const notExistsMsg = 'Shared achievement progress table doesn\'t exist!';
    const successMsg = tableExists ? existsMsg : notExistsMsg;
    send(successMsg, reply);
    return JSON.parse(JSON.stringify(rows));
  } catch (err) {
    const errMsg = `Failed to fetch shared achievement progress table data!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}

export const createSharedProgTable = async (conn: Connection, reply?: Reply) => {
  const sql = `
    CREATE TABLE character_achievement_shared_progress (
      id INT,
      criteria INT,
      counter INT DEFAULT 0,
      date BIGINT DEFAULT 0,
      PRIMARY KEY (id, criteria)
    )
  `;
  try {
    const startMsg = 'Creating character_achievement_shared_progress table...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql);
    const successMsg = 'Successfully created character_achievement_shared_progress table!';
    send(successMsg, reply);
    return JSON.parse(JSON.stringify(rows));
  } catch (err) {
    const errMsg = `Failed to create character_achievement_shared_progress table!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}

export const selAchSharedProg = async (
  conn: Connection,
  accountIDs: number[],
  reply?: Reply,
) => {
  const sql = `
    SELECT * FROM character_achievement_shared_progress
    WHERE id IN (?)
  `;
  try {
    const startMsg = 'Fetching character achievement shared progress data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [accountIDs]);
    const successMsg = 'Character achievement shared progress data fetched!';
    send(successMsg, reply);
    return JSON.parse(JSON.stringify(rows));
  } catch (err) {
    const errMsg = `Failed to fetch character achievement shared progress data!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}

export const insUpdCharAchSharedProg = async (
  conn: Connection,
  achSharedProg: SharedProgValues,
  reply?: Reply,
) => {
  const columns = 'id, criteria, counter, date';
  const values = achSharedProg.map(a =>  [a.id, a.criteria, a.counter, a.date]);
  const sql = `
    INSERT INTO character_achievement_shared_progress (${columns}) VALUES ?
      ON DUPLICATE KEY UPDATE counter=VALUES(counter), date=VALUES(date)
  `;
  try {
    const startMsg = 'Saving new character achievement shared progress...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [values]);
    const successMsg = 'New character achievement shared progress saved!';
    send(successMsg, reply);
    return JSON.parse(JSON.stringify(rows));
  } catch (err) {
    const errMsg = `Failed to save new character achievement shared progress!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}
