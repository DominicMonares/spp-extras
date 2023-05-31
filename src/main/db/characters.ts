import { send } from '../../utils';

// ----------------------------------------------------------------
// Characters
// ----------------------------------------------------------------

export const selChars = async (conn: any, xpac: any, accts: any, reply?: any) => { // TEMP ANY
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
    return rows;
  } catch (err) {
    const errMsg = `Failed to fetch character data!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}

// ----------------------------------------------------------------
// Achievement Credit
// ----------------------------------------------------------------

export const selAllCharAchs = async (conn: any, charIDs: any, reply?: any) => { // TEMP ANY
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
    return rows;
  } catch (err) {
    const errMsg = `Failed to fetch character achievement credit data!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}

export const insCharAchs = async (conn: any, achievements: any, reply?: any) => { // TEMP ANY
  const columns = 'guid, achievement, date';
  const values = achievements.map((a: any) => { // TEMP ANY
    return [a.guid, a.achievement, a.date];
  });
  const sql = `INSERT IGNORE INTO character_achievement (${columns}) VALUES ?`;
  try {
    const startMsg = 'Saving new character achievement credit...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [values]);
    const successMsg = 'New character achievement credit successfully saved!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to save new character achievement credit!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}

// ----------------------------------------------------------------
// Achievement Progress
// ----------------------------------------------------------------

export const selAllAchProg = async (conn: any, charIDs: any, reply?: any) => { // TEMP ANY
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
    return rows;
  } catch (err) {
    const errMsg = `Failed to fetch character achievement progress data!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}

export const insUpdAchProg = async (conn: any, achievements: any, reply?: any) => { // TEMP ANY
  const columns = 'guid, criteria, counter, date';
  const values = achievements.map((a: any) => { // TEMP ANY
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
    return rows;
  } catch (err) {
    const errMsg = `Failed to save new character achievement progress!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}

// ----------------------------------------------------------------
// Achievement Shared Progress
// ----------------------------------------------------------------

export const showSharedProg = async (conn: any, reply?: any) => { // TEMP ANY
  const sql = 'SHOW TABLES LIKE "character_achievement_shared_progress"';
  try {
    const startMsg = 'Fetching shared achievement progress table data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql);
    const successMsg = 'Shared achievement progress table data fetched!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to fetch shared achievement progress table data!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}

export const createSharedProgTable = async (conn: any, reply?: any) => { // TEMP ANY
  const sql = `
    CREATE TABLE character_achievement_shared_progress (
      account INT NOT NULL,
      criteria INT NOT NULL,
      counter INT DEFAULT 0,
      date BIGINT
    )
  `;
  try {
    const startMsg = 'Creating character_achievement_shared_progress table...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql);
    const successMsg = 'Successfully created character_achievement_shared_progress table!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to create character_achievement_shared_progress table!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}

export const selAllCharAchSharedProg = async (conn: any, accountIDs: boolean, reply?: any) => { // TEMP ANY
  const sql = `
    SELECT * FROM character_achievement_shared_progress
    WHERE guid IN (?)
  `;
  try {
    const startMsg = 'Fetching character achievement shared progress data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [accountIDs]);
    const successMsg = 'Character achievement shared progress data fetched!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to fetch character achievement shared progress data!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}

export const insUpdCharAchSharedProg = async (conn: any, achievements: any, reply?: any) => { // TEMP ANY
  const columns = 'account, criteria, counter, date';
  const values = achievements.map((a: any) => { // TEMP ANY
    return [a.account, a.criteria, a.counter, a.date];
  });
  const sql = `
    INSERT INTO character_achievement_shared_progress (${columns}) VALUES ?
      ON DUPLICATE KEY UPDATE counter=VALUES(counter), date=VALUES(date)
  `;
  try {
    const startMsg = 'Saving new character achievement shared progress...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [values]);
    const successMsg = 'New character achievement shared progress successfully saved!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to save new character achievement shared progress!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}

// ----------------------------------------------------------------
// Achievement Reward Titles
// ----------------------------------------------------------------

export const updRewardTitles = async (conn: any, titles: any, reply?: any) => { // TEMP ANY
  const values = titles.map((t: any) => { // TEMP ANY
    return [t.guid, t.knownTitles];
  });
  const sql = `
    INSERT INTO characters (guid, knownTitles) VALUES ?
      ON DUPLICATE KEY UPDATE knownTitles=VALUES(knownTitles)
  `;
  try {
    const startMsg = 'Updating character titles...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [values]);
    const successMsg = 'Character titles updated!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to update character titles!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}

// ----------------------------------------------------------------
// Achievement Reward Items
// ----------------------------------------------------------------

export const selLastItemInstID = async (conn: any, reply?: any) => { // TEMP ANY
  const sql = 'SELECT MAX(guid) FROM item_instance';
  try {
    const startMsg = 'Fetching last item instance ID data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql);
    const successMsg = 'Last item instance ID data fetched!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to fetch last item instance ID data!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}

export const insRewardItemInstances = async (conn: any, instances: any, reply?: any) => { // TEMP ANY
  const columns = `
    guid,
    owner_guid,
    itemEntry,
    creatorGuid,
    giftCreatorGuid,
    count,
    duration,
    charges,
    flags,
    enchantments,
    randomPropertyId,
    durability,
    playedTime,
    text
  `;
  const values = instances.map((i: any) => { // TEMP ANY
    return [
      i.guid,
      i.owner_guid,
      i.itemEntry,
      i.creatorGuid,
      i.giftCreatorGuid,
      i.count,
      i.duration,
      i.charges,
      i.flags,
      i.enchantments,
      i.randomPropertyId,
      i.durability,
      i.playedTime,
      i.text
    ];
  });
  const sql = `INSERT INTO item_instance (${columns}) VALUES ?`;
  try {
    const startMsg = 'Saving new item instance data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [values]);
    const successMsg = 'New item instance data successfully saved!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to save new item instance data!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}

export const selLastMailID = async (conn: any, reply?: any) => { // TEMP ANY
  const sql = 'SELECT MAX(id) FROM mail';
  try {
    const startMsg = 'Fetching last mail ID data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql);
    const successMsg = 'Last mail ID data fetched!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to fetch last mail ID data!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}

export const insRewardMail = async (conn: any, mail: any, reply?: any) => { // TEMP ANY
  const columns = `
    id,
    messageType,
    stationery,
    mailTemplateId,
    sender,
    receiver,
    subject,
    body,
    has_items,
    expire_time,
    deliver_time,
    money,
    cod,
    checked
  `;
  const values = mail.map((m: any, reply?: any) => { // TEMP ANY
    return [
      m.id,
      m.messageType,
      m.stationery,
      m.mailTemplateId,
      m.sender,
      m.receiver,
      m.subject,
      m.body,
      m.has_items,
      m.expire_time,
      m.deliver_time,
      m.money,
      m.cod,
      m.checked
    ];
  });
  const sql = `INSERT INTO mail (${columns}) VALUES ?`;
  try {
    const startMsg = 'Saving new mail data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [values]);
    const successMsg = 'New mail data successfully saved!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to save new mail data!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}

export const insRewardMailItems = async (conn: any, items: any, reply?: any) => { // TEMP ANY
  const columns = 'mail_id, item_guid, item_template, receiver';
  const values = items.map((i: any) => { // TEMP ANY
    return [i.mail_id, i.item_guid, i.item_template, i.receiver];
  });
  const sql = `INSERT INTO mail_items (${columns}) VALUES ?`;
  try {
    const startMsg = 'Saving new mail item data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [values]);
    const successMsg = 'New mail item data successfully saved!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to save new mail item data!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}

// ----------------------------------------------------------------
// Quests
// ----------------------------------------------------------------

export const selCompletedRegQuests = async (conn: any, charIDs: any, reply?: any) => { // TEMP ANY
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
    return rows;
  } catch (err) {
    const errMsg = `Failed to fetch completed regular quest data!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}

export const selCompletedDailyQuests = async (conn: any, charIDs: any, reply?: any) => { // TEMP ANY
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
    return rows;
  } catch (err) {
    const errMsg = `Failed to fetch completed daily quest data!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}

export const selCompletedWeeklyQuests = async (conn: any, charIDs: any, reply?: any) => { // TEMP ANY
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
    return rows;
  } catch (err) {
    const errMsg = `Failed to fetch completed weekly quest data!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}

export const selCompletedMonthlyQuests = async (conn: any, charIDs: any, reply?: any) => { // TEMP ANY
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
    return rows;
  } catch (err) {
    const errMsg = `Failed to fetch completed monthly quest data!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}

// ----------------------------------------------------------------
// Reputation
// ----------------------------------------------------------------

export const selAllCharRep = async (conn: any, charIDs: any, reply?: any) => { // TEMP ANY
  const sql = `
    SELECT guid, faction, standing FROM character_reputation
    WHERE guid IN (?)
  `;
  try {
    const startMsg = 'Fetching character reputation data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [charIDs]);
    const successMsg = 'Character reputation data fetched!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to fetch character reputation data!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}

export const updCharRep = async (conn: any, reputations: any, reply?: any) => { // TEMP ANY
  const values = reputations.map((r: any) => { // TEMP ANY
    return [r.guid, r.faction, r.standing, r.flags];
  });
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
    return rows;
  } catch (err) {
    const errMsg = `Failed to update character reputation standings!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}

// ----------------------------------------------------------------
// Pets and Mounts
// ----------------------------------------------------------------

export const selCharRidingSkills = async (conn: any, charIDs: any, reply?: any) => { // TEMP ANY
  const sql = `
    SELECT guid, value FROM character_skills
    WHERE guid IN (?) AND skill=762
  `;
  try {
    const startMsg = 'Fetching character riding skill data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [charIDs]);
    const successMsg = 'Character riding skill data fetched!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to fetch character riding skill data!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}

export const selCharPetMountSpells = async (conn: any, charIDs: any, spellIDs: any, reply?: any) => { // TEMP ANY
  const sql = `
    SELECT guid, spell FROM character_spell
    WHERE guid IN (?) AND spell IN (?)
  `;
  try {
    const startMsg = 'Fetching character pet and mount spell data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [charIDs, spellIDs]);
    const successMsg = 'Character pet and mount spell data fetched!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to fetch character pet and mount spell data!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}

export const insCharPetMountSpells = async (conn: any, spells: any, reply?: any) => { // TEMP ANY
  const columns = 'guid, spell, active, disabled';
  const values = spells.map((s: any) => { // TEMP ANY
    return [
      s.guid,
      s.spell,
      1, // active
      0 // disabled
    ];
  });
  const sql = `INSERT INTO character_spell (${columns}) VALUES ?`;
  try {
    const startMsg = 'Saving new pet and mount spell data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [values]);
    const successMsg = 'New pet and mount spell data successfully saved!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to save new pet and mount spell data!\n${err}`;
    send(errMsg, reply);
    throw err;
  }
}
