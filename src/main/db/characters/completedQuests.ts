import { send } from '../../../utils';
import {
  Connection,
  Reply,
} from '../../../types';

// ----------------------------------------------------------------
// Completed Quests
// ----------------------------------------------------------------

export const selCompletedRegQuests = async (
  conn: Connection,
  charIDs: number[],
  reply?: Reply
) => {
  const sql = `
    SELECT * FROM character_queststatus
    WHERE guid IN (?) AND status=1
  `;
  try {
    const startMsg = 'Fetching completed regular quest data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [charIDs]);
    const successMsg = 'Completed regular quest data fetched!';
    send(successMsg, reply);
    return JSON.parse(JSON.stringify(rows));
  } catch (err) {
    const errMsg = `Failed to fetch completed regular quest data!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}

export const selCompletedDailyQuests = async (
  conn: Connection,
  charIDs: number[],
  reply?: Reply
) => {
  const sql = `
    SELECT * FROM character_queststatus_daily
    WHERE guid IN (?)
  `;
  try {
    const startMsg = 'Fetching completed daily quest data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [charIDs]);
    const successMsg = 'Completed daily quest data fetched!';
    send(successMsg, reply);
    return JSON.parse(JSON.stringify(rows));
  } catch (err) {
    const errMsg = `Failed to fetch completed daily quest data!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}

export const selCompletedWeeklyQuests = async (
  conn: Connection,
  charIDs: number[],
  reply?: Reply
) => {
  const sql = `
    SELECT * FROM character_queststatus_weekly
    WHERE guid IN (?)
  `;
  try {
    const startMsg = 'Fetching completed weekly quest data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [charIDs]);
    const successMsg = 'Completed weekly quest data fetched!';
    send(successMsg, reply);
    return JSON.parse(JSON.stringify(rows));
  } catch (err) {
    const errMsg = `Failed to fetch completed weekly quest data!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}

export const selCompletedMonthlyQuests = async (
  conn: Connection,
  charIDs: number[],
  reply?: Reply
) => {
  const sql = `
    SELECT * FROM character_queststatus_monthly
    WHERE guid IN (?)
  `;
  try {
    const startMsg = 'Fetching completed monthly quest data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [charIDs]);
    const successMsg = 'Completed monthly quest data fetched!';
    send(successMsg, reply);
    return JSON.parse(JSON.stringify(rows));
  } catch (err) {
    const errMsg = `Failed to fetch completed monthly quest data!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}
