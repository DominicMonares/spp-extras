import { checkFaction } from "./characters";
import _factionSpells from '../../data/petsAndMounts/factionSpells.json';
import _professionSpells from '../../data/petsAndMounts/professionSpells.json';

interface FactionSpells { // REFACTOR AND MOVE TO TYPE FILE
  [key: string]: {
    name: string;
    faction: string; // TEMP TYPE
    oppFactionSpell: number;
  };
}
const factionSpells = _factionSpells as FactionSpells;
interface ProfessionSpells { // MOVE TO TYPE FILE
  [key: string]: number;
}
const professionSpells = _professionSpells as ProfessionSpells;

// Share pet and mount spells between all characters
export const createPetMountSpellValues = ( // TEMP ANYS
  petMountItems: any,
  accounts: any,
  knownSpells: any,
  charRidingSkills: any,
) => {
  const dbValues: any = []; // TEMP ANY
  for (const acctID in accounts) {
    const account = accounts[acctID];
    const characters = account.characters;
    const mergedChars = { ...characters.alliance, ...characters.horde };

    // Get all known pets and mounts on account level
    const accountItems: any = {}; // TEMP ANY
    for (const charID in mergedChars) {
      const spells = knownSpells[charID];
      if (spells) {
        for (const spellID in spells) {
          const spellItem = petMountItems[spellID];
          if (spellItem) accountItems[spellID] = spellItem;
        }
      }
    }

    // Add pets and mounts for chars that don't already have them and can use them
    for (const charID in mergedChars) {
      const char = mergedChars[charID];
      const charFaction = checkFaction(char.race);
      for (let spellID in accountItems) {
        let item = accountItems[spellID];

        // Change to opposing faction pet/mount if faction equivalents exist
        const factionSpell = factionSpells[spellID];
        if (factionSpell) {
          const factionSpellFaction = factionSpell.faction;
          const factionMatch = charFaction === factionSpellFaction;
          const oppFactionSpell = factionSpell.oppFactionSpell.toString();
          const oppFactionSpellKnown = accountItems[oppFactionSpell];

          // Skip if opposing faction spell already known on account level
          if (!factionMatch && oppFactionSpellKnown) continue;
          // Change ID/item data if opp faction spell not known on account level
          else if (!factionMatch && !oppFactionSpellKnown) {
            spellID = oppFactionSpell;
            item = petMountItems[spellID];
          }
        }

        // Check to see if character has high enough riding skill
        const skillExists = charRidingSkills[charID];
        const charSkill = skillExists ? charRidingSkills[charID] : 0;

        // Switch required profession skill for riding skill with eng/tailoring mounts
        // This allows any character to use these mounts without the professions
        const profSpellExists = professionSpells[spellID];
        const skillRank = item.RequiredSkillRank;
        const reqSkill = profSpellExists ? professionSpells[spellID] : skillRank;
        const skillMatch = charSkill >= reqSkill;

        // Check to see if character and pet/mount factions match
        const reqFaction = item.AllowableRace;
        const spellIsAlliance = reqFaction === 68 || reqFaction === 1101;
        const charIsAlliance = charFaction === 'alliance';
        const allianceMatch = spellIsAlliance && charIsAlliance;
        const spellIsHorde = reqFaction === 690;
        const charIsHorde = charFaction === 'horde';
        const hordeMatch = spellIsHorde && charIsHorde;
        const neutralMatch = reqFaction === -1 || reqFaction === 32767;
        const factionMatch = allianceMatch || hordeMatch || neutralMatch;

        // Check to see if character meets all requirements
        const charCanUse = skillMatch && factionMatch;
        const alreadyKnown = knownSpells[charID]?.includes(spellID);
        if (charCanUse && !alreadyKnown) {
          dbValues.push({
            guid: charID,
            spell: spellID
          });
        }
      }
    }
  }

  return dbValues;
}
