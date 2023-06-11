import { checkFaction } from './characters';
import {
  AccountCharacters,
  FactionSpells,
  KnownSpells,
  PetMountItems,
  PetMountSpellValues,
  ProfessionSpells,
  RidingSkills
} from 'types';
import _factionSpells from '../../data/petsAndMounts/factionSpells.json';
import _professionSpells from '../../data/petsAndMounts/professionSpells.json';

const factionSpells = _factionSpells as FactionSpells;
const professionSpells = _professionSpells as ProfessionSpells;

// Share pet and mount spells between all characters
export const createPetMountSpellValues = (
  acctChars: AccountCharacters,
  petMountItems: PetMountItems,
  knownSpells: KnownSpells,
  ridingSkills: RidingSkills,
) => {
  const dbValues: PetMountSpellValues = [];
  for (const acctID in acctChars) {
    const account = acctChars[acctID];
    const characters = account.characters;
    const mergedChars = { ...characters.alliance, ...characters.horde };

    // Get all known pets and mounts on account level
    const accountItems: PetMountItems = {};
    for (const charID in mergedChars) {
      const spells = knownSpells[charID];
      if (spells) {
        for (const s in spells) {
          const spellID = spells[s];
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
        const skillExists = ridingSkills[charID];
        const charSkill = skillExists ? ridingSkills[charID] : 0;

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
        const alreadyKnown = knownSpells[charID]?.includes(Number(spellID));
        if (charCanUse && !alreadyKnown) {
          dbValues.push({
            guid: Number(charID),
            spell: Number(spellID),
          });
        }
      }
    }
  }

  return dbValues;
}
