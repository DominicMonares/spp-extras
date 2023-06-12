import { send } from '../../../utils';
import { Connection, Reply } from 'types';

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
    return JSON.parse(JSON.stringify(rows));
  } catch (err) {
    const errMsg = `Failed to template quest item data!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}
