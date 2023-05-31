import { send } from '../../utils';
import cutTitles from '../../../data/titles/cutTitles.json';

// ----------------------------------------------------------------
// Achievement Rewards
// ----------------------------------------------------------------

export const selAllAchRewards = async (conn: any, reply?: any) => { // TEMP ANY
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
    throw err;
  }
}

// ----------------------------------------------------------------
// Cut Titles
// ----------------------------------------------------------------

export const selCutTitle = async (conn: any, reply?: any) => { // TEMP ANY
  const sql = `
    SELECT * FROM achievement_reward
    WHERE entry=457
  `;
  try {
    const startMsg = 'Fetching cut title data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql);
    const successMsg = 'Cut title data fetched!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to fetch cut title data!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}

export const insCutTitles = async (conn: any, reply?: any) => { // TEMP ANY
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
  const sql = `INSERT INTO achievement_reward (${columns}) VALUES ?`;
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
    throw err;
  }
}

// ----------------------------------------------------------------
// Items
// ----------------------------------------------------------------

export const selRewItemCharges = async (conn: any, items: any, reply?: any) => { // TEMP ANY
  const sql = `
    SELECT entry, spellcharges_1 FROM item_template
    WHERE entry IN (?)
  `;
  try {
    const startMsg = 'Fetching reward item charge data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [items]);
    const successMsg = 'Reward item charge data fetched!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to fetch reward item charge data!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}

export const selPetMountItems = async (conn: any, reply?: any) => { // TEMP ANY
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
    throw err;
  }
}

// ----------------------------------------------------------------
// Quests
// ----------------------------------------------------------------

export const selAllTemplateQuests = async (conn: any, reply?: any) => { // TEMP ANY
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
    throw err;
  }
}
