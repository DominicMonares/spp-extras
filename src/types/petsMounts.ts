// ----------------------------------------------------------------
// Items
// ----------------------------------------------------------------

import { Faction } from "./factions";

export type PetMountItem = {
  entry: number;
  subclass: number;
  name: string;
  AllowableRace: number;
  RequiredSkillRank: number;
  spellid_2: number;
}

export type PetMountItems = {
  [key: string]: PetMountItem;
}

// ----------------------------------------------------------------
// Spells
// ----------------------------------------------------------------

export type KnownSpells = {
  [key: string]: number[];
}

// ----------------------------------------------------------------
// Skills
// ----------------------------------------------------------------

export type RidingSkills = {
  [key: string]: number;
}

// ----------------------------------------------------------------
// JSON Data
// ----------------------------------------------------------------

export type FactionSpells = {
  [key: string]: {
    name: string;
    faction: Faction;
    oppFactionSpell: number;
  };
}

export type ProfessionSpells = {
  [key: string]: number;
}
