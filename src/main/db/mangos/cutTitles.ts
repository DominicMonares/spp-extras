import { send } from '../../../utils';
import cutTitles from '../../../data/titles/cutTitles.json';
import { Connection, Reply } from 'types';

// ----------------------------------------------------------------
// Cut Titles
// ----------------------------------------------------------------

export const selCutTitle = async (conn: Connection, reply?: Reply) => {
  // Look for 'the Supreme' title to see if cut titles already exist
  const sql = `
    SELECT * FROM achievement_reward
    WHERE entry=457
  `;
  try {
    const startMsg = 'Fetching cut title data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql);
    const titleExists = Array.isArray(rows) && rows.length ? true : false;
    const existsMsg = 'Cut title data fetched!';
    const notExistsMsg = 'Cut title data doesn\'t exist!';
    const successMsg = titleExists ? existsMsg : notExistsMsg;
    send(successMsg, reply);
    return JSON.parse(JSON.stringify(rows));
  } catch (err) {
    const errMsg = `Failed to fetch cut title data!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}

export const insCutTitles = async (conn: Connection, reply?: Reply) => {
  const columns = 'entry, gender, title_A, title_H, item, sender, subject, text';
  const values = cutTitles.map(t => {
    return [
      t.achievement, // entry
      2, // gender
      t.title_A,
      t.title_H,
      0, // item
      0, // sender
      null, // subject
      null, // text
    ];
  });
  const sql = `INSERT IGNORE INTO achievement_reward (${columns}) VALUES ?`;
  try {
    const startMsg = 'Adding cut titles to the database...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [values]);
    const successMsg = 'Cut titles successfully added to the database!';
    send(successMsg, reply);
    return JSON.parse(JSON.stringify(rows));
  } catch (err) {
    const errMsg = `Failed to add cut titles to database!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}
