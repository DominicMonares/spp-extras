// ----------------------------------------------------------------
// Pets & Mounts
// ----------------------------------------------------------------

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

export type KnownSpells = {
  [key: string]: number[];
}

export type RidingSkills = {
  [key: string]: number;
}
