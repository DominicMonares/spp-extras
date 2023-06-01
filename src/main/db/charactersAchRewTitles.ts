import { send } from '../../utils';
import {
  Connection,
  Reply,
  TitleValues,
} from '../../types';

// ----------------------------------------------------------------
// Achievement Reward Titles
// ----------------------------------------------------------------

export const updRewardTitles = async (
  conn: Connection,
  titles: TitleValues,
  reply?: Reply
) => {
  const values = titles.map(t => [t.guid, t.knownTitles]);
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
    throw errMsg;
  }
}
