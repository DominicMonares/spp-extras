import {
  insCharPetMountSpells,
  selCharPetMountSpells,
  selCharRidingSkills,
  selPetMountItems,
} from '../db';
import {
  createPetMountSpellValues,
  formatCharSkillData,
  formatCharSpellData,
  formatPetMountItemData,
  send,
} from '../../utils';
import { PetMountSpellValues } from 'types';

export const transferPetsMounts = async (
  acctChars: any,
  charIDs: any,
  reply: any,
  charactersDB: any,
  mangosDB: any,
) => {
  // Fetch and format pet and mount items
  let spellIDs: any = []; // TEMP ANY
  let petMountItems: any = {}; // TEMP ANY
  try {
    const rawPetMountItems = await selPetMountItems(mangosDB, reply);
    if (Array.isArray(rawPetMountItems)) spellIDs = rawPetMountItems.map(i => {
      const item: number = JSON.parse(JSON.stringify(i)).spellid_2; // RowDataPacket workaround
      return item;
    });
    petMountItems = formatPetMountItemData(rawPetMountItems);
  } catch (err) {
    throw err;
  }

  // Fetch and format pet and mount spells
  let knownSpells: any = {}; // TEMP ANY
  try {
    const rawSpells = await selCharPetMountSpells(charactersDB, charIDs, spellIDs, reply);
    knownSpells = formatCharSpellData(rawSpells);
  } catch (err) {
    throw err;
  }

  // Fetch and format character riding skills
  let charRidingSkills: any = {}; // TEMP ANY
  try {
    const rawCharSkills = await selCharRidingSkills(charactersDB, charIDs, reply);
    charRidingSkills = formatCharSkillData(rawCharSkills);
  } catch (err) {
    throw err;
  }

  // Create new DB values
  let petMountSpellValues: PetMountSpellValues = [];
  try {
    send('Creating new pet and mount spell DB values...', reply);
    petMountSpellValues = createPetMountSpellValues(
      petMountItems,
      acctChars,
      knownSpells,
      charRidingSkills
    );
    send('New pet and mount spell DB values created!', reply);
  } catch (err) {
    const errMsg = `Failed to create new pet and mount spell DB values!\n${err}`;
    send(errMsg, reply);
    throw err;
  }

  // Run query to save new pet and mount spell values
  if (petMountSpellValues.length) try {
    await insCharPetMountSpells(charactersDB, petMountSpellValues, reply);
  } catch (err) {
    throw err;
  }
}
