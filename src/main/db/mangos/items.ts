import { send } from '../../../utils';
import { Connection, Reply } from 'types';

// ----------------------------------------------------------------
// Items
// ----------------------------------------------------------------

export const selRewItemCharges = async (
  conn: Connection,
  itemIDs: number[],
  reply?: Reply,
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
    return JSON.parse(JSON.stringify(rows));
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
    return JSON.parse(JSON.stringify(rows));
  } catch (err) {
    const errMsg = `Failed to fetch pet and mount item data!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}
