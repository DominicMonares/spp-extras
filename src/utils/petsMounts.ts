// Organize pet and mount items by spell ID
export const formatPetMountItemData = (items: any) => { // TEMP ANY
  const all: any = {}; // TEMP ANY
  items.forEach((item: any) => { // TEMP ANY
    const spellID = item.spellid_2.toString();
    all[spellID] = item;
  });
  return all;
}

// Organize known pet and mount spells by character
export const formatCharSpellData = (spells: any) => { // TEMP ANY
  const all: any = {}; // TEMP ANY
  spells.forEach((spell: any) => { // TEMP ANY
    const guid = spell.guid.toString();
    const spellID = spell.spell;
    if (!all[guid]) all[guid] = [spellID];
    else all[guid].push(spellID);
  });
  return all;
}

// Organize riding skills by character
export const formatCharSkillData = (skills: any) => { // TEMP ANY
  const all: any = {}; // TEMP ANY
  skills.forEach((skill: any) => { // TEMP ANY
    const guid = skill.guid.toString();
    const value = skill.value;
    all[guid] = value;
  });
  return all;
}
