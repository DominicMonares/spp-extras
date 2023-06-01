import { send } from '../../utils';
import cutTitles from '../../../data/titles/cutTitles.json';
import { Connection, Reply } from '../../types';

// ----------------------------------------------------------------
// Achievement Rewards
// ----------------------------------------------------------------

export const selAchRewards = async (conn: Connection, reply?: Reply) => {
  const sql = `SELECT * FROM achievement_reward`;
  try {
    const startMsg = 'Fetching achievement reward data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql);
    const successMsg = 'Achievement reward data fetched!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to fetch achievement reward data!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}

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
    return rows;
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
      null // text
    ];
  });
  const sql = `INSERT IGNORE INTO achievement_reward (${columns}) VALUES ?`;
  try {
    const startMsg = 'Adding cut titles to the database...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [values]);
    const successMsg = 'Cut titles successfully added to the database!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to add cut titles to database!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}

// ----------------------------------------------------------------
// Items
// ----------------------------------------------------------------

export const selRewItemCharges = async (
  conn: Connection,
  itemIDs: number[],
  reply?: Reply
) => {
  const sql = `
    SELECT entry, spellcharges_1 FROM item_template
    WHERE entry IN (?)
  `;
  try {
    const startMsg = 'Fetching reward item charge data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [itemIDs]);
    const successMsg = 'Reward item charge data fetched!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to fetch reward item charge data!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}

export const selPetMountItems = async (conn: Connection, reply?: Reply) => {
  const values = `
    entry,
    subclass,
    name,
    AllowableRace,
    RequiredSkillRank,
    spellid_2
  `;
  const sql = `
    SELECT ${values} FROM item_template
    WHERE class=15 AND AllowableClass=-1 AND (subclass=2 OR subclass=5)
  `;
  try {
    const startMsg = 'Fetching pet and mount item data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql);
    const successMsg = 'Pet and mount item data fetched!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to fetch pet and mount item data!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}

// ----------------------------------------------------------------
// Quests
// ----------------------------------------------------------------

export const selTemplateQuests = async (conn: Connection, reply?: Reply) => {
  const values = `
    entry,
    ZoneOrSort,
    Type,
    RequiredClasses,
    RequiredRaces,
    Title,
    QuestFlags
  `;
  const sql = `SELECT ${values} FROM quest_template`;
  try {
    const startMsg = 'Fetching template quest data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql);
    const successMsg = 'Template quest data fetched!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to template quest item data!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}
