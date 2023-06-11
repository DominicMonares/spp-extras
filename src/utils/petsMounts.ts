import {
  KnownSpells,
  PetMountItems,
  RawCharRidingSkills,
  RawPetMountItems,
  RawPetMountSpells,
  RidingSkills,
} from 'types';

// Organize pet and mount items by spell ID
export const formatPetMountItemData = (items: RawPetMountItems) => {
  const all: PetMountItems = {};
  items.forEach(item => {
    const spellID = item.spellid_2;
    all[spellID] = item;
  });
  return all;
}

// Organize known pet and mount spells by character
export const formatCharSpellData = (spells: RawPetMountSpells) => {
  const all: KnownSpells = {};
  spells.forEach(spell => {
    const guid = spell.guid;
    const spellID = spell.spell;
    if (!all[guid]) all[guid] = [spellID];
    else all[guid].push(spellID);
  });
  return all;
}

// Organize riding skills by character
export const formatCharSkillData = (skills: RawCharRidingSkills) => {
  const all: RidingSkills = {};
  skills.forEach(skill => {
    const guid = skill.guid;
    const value = skill.value;
    all[guid] = value;
  });
  return all;
}
