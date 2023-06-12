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
import {
  AccountCharacters,
  Connection,
  KnownSpells,
  PetMountItems,
  PetMountSpellValues,
  RawCharRidingSkills,
  RawPetMountItems,
  RawPetMountSpells,
  Reply,
  RidingSkills,
} from 'types';

export const transferPetsMounts = async (
  acctChars: AccountCharacters,
  charIDs: number[],
  charactersDB: Connection,
  mangosDB: Connection,
  reply: Reply,
) => {
  // Fetch and format pet and mount items
  let spellIDs: number[] = [];
  let petMountItems: PetMountItems = {};
  try {
    const rawPetMountItems: RawPetMountItems = await selPetMountItems(mangosDB, reply);
    spellIDs = rawPetMountItems.map(i => i.spellid_2);
    petMountItems = formatPetMountItemData(rawPetMountItems);
  } catch (err) {
    throw err;
  }

  // Fetch and format pet and mount spells
  let knownSpells: KnownSpells = {};
  try {
    const rawSpells: RawPetMountSpells = await selCharPetMountSpells(
      charactersDB,
      charIDs,
      spellIDs,
      reply
    );
    knownSpells = formatCharSpellData(rawSpells);
  } catch (err) {
    throw err;
  }

  // Fetch and format character riding skills
  let ridingSkills: RidingSkills = {};
  try {
    const rawCharSkills: RawCharRidingSkills = await selCharRidingSkills(
      charactersDB,
      charIDs,
      reply
    );
    ridingSkills = formatCharSkillData(rawCharSkills);
  } catch (err) {
    throw err;
  }

  // Create new DB values
  let petMountSpellValues: PetMountSpellValues = [];
  try {
    send('Creating new pet and mount spell DB values...', reply);
    petMountSpellValues = createPetMountSpellValues(
      acctChars,
      petMountItems,
      knownSpells,
      ridingSkills
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
