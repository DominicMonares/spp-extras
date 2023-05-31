import cutTitles from '../../../data/titles/cutTitles.json';

// ----------------------------------------------------------------
// Achievement Rewards
// ----------------------------------------------------------------

export const selAllAchRewards = async (conn: any) => { // TEMP ANY
  const sql = `SELECT * FROM achievement_reward`;
  try {
    console.log('Fetching achievement reward data...');
    const [rows] = await conn.query(sql);
    console.log('Achievement reward data fetched!');
    return rows;
  } catch (err) {
    err = `Failed to fetch achievement reward data!\n${err}`;
    console.error(err);
    throw err;
  }
}

// ----------------------------------------------------------------
// Cut Titles
// ----------------------------------------------------------------

export const selCutTitle = async (conn: any) => { // TEMP ANY
  const sql = `
    SELECT * FROM achievement_reward
    WHERE entry=457
  `;
  try {
    console.log('Fetching cut title data...');
    const [rows] = await conn.query(sql);
    console.log('Cut title data fetched!');
    return rows;
  } catch (err) {
    err = `Failed to fetch cut title data!\n${err}`;
    console.error(err);
    throw err;
  }
}

export const insCutTitles = async (conn: any) => { // TEMP ANY
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
    console.log('Adding cut titles to the database...');
    const [rows] = await conn.query(sql, [values]);
    console.log('Cut titles successfully added to the database!');
    return rows;
  } catch (err) {
    err = `Failed to add cut titles to database!\n${err}`;
    console.error(err);
    throw err;
  }
}

// ----------------------------------------------------------------
// Items
// ----------------------------------------------------------------

export const selRewItemCharges = async (conn: any, items: any) => { // TEMP ANY
  const sql = `
    SELECT entry, spellcharges_1 FROM item_template
    WHERE entry IN (?)
  `;
  try {
    console.log('Fetching reward item charge data...');
    const [rows] = await conn.query(sql, [items]);
    console.log('Reward item charge data fetched!');
    return rows;
  } catch (err) {
    err = `Failed to fetch reward item charge data!\n${err}`;
    console.error(err);
    throw err;
  }
}

export const selPetMountItems = async (conn: any) => { // TEMP ANY
  const values = `
    'entry',
    'subclass',
    'name',
    'AllowableRace',
    'RequiredSkillRank',
    'spellid_2'
  `;
  const sql = `
    SELECT ${values} FROM item_template
    WHERE class=15 AND AllowableClass=-1 AND (subclass=2 OR subclass=5)
  `;
  try {
    console.log('Fetching pet and mount item data...');
    const [rows] = await conn.query(sql);
    console.log('Pet and mount item data fetched!');
    return rows;
  } catch (err) {
    err = `Failed to fetch pet and mount item data!\n${err}`;
    console.error(err);
    throw err;
  }
}

// ----------------------------------------------------------------
// Quests
// ----------------------------------------------------------------

export const selAllTemplateQuests = async (conn: any) => { // TEMP ANY
  const values = `
    'entry',
    'ZoneOrSort',
    'Type',
    'RequiredClasses',
    'RequiredRaces',
    'Title',
    'QuestFlags'
  `;
  const sql = `SELECT ${values} FROM quest_template`;
  try {
    console.log('Fetching template quest data...');
    const [rows] = await conn.query(sql);
    console.log('Template quest data fetched!');
    return rows;
  } catch (err) {
    err = `Failed to template quest item data!\n${err}`;
    console.error(err);
    throw err;
  }
}
