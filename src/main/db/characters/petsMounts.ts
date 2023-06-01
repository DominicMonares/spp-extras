import { send } from '../../../utils';
import {
  Connection,
  PetMountSpellValues,
  Reply,
} from '../../../types';

// ----------------------------------------------------------------
// Pets and Mounts
// ----------------------------------------------------------------

export const selCharRidingSkills = async (
  conn: Connection,
  charIDs: number[],
  reply?: Reply
) => {
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
    throw errMsg;
  }
}

export const selCharPetMountSpells = async (
  conn: Connection,
  charIDs: number[],
  spellIDs: number[],
  reply?: Reply
) => {
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
    throw errMsg;
  }
}

export const insCharPetMountSpells = async (
  conn: Connection,
  spells: PetMountSpellValues,
  reply?: Reply
) => {
  const columns = 'guid, spell, active, disabled';
  const values = spells.map(s => {
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
    throw errMsg;
  }
}
