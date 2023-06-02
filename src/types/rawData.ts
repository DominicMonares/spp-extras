import {
  CharacterClass,
  Race,
} from "./characters";
import {
  Quest,
  RegQuest,
  TemplateQuest
} from "./quests";

// ----------------------------------------------------------------
// Accounts
// ----------------------------------------------------------------

export type RawAccount = {
  id: number;
  username: string;
}

export type RawAccounts = RawAccount[];

// ----------------------------------------------------------------
// Characters
// ----------------------------------------------------------------

export type RawCharacter = {
  guid: number;
  account: number;
  name: string;
  race: Race;
  class: CharacterClass;
}

export type RawCharacters = RawCharacter[];

// ----------------------------------------------------------------
// Quests
// ----------------------------------------------------------------

export type RawComplRegQuests = RegQuest[];

// Used for dailies, weeklies, and monthlies
export type RawComplNonRegQuests = Quest[];

export type RawTemplateQuests = TemplateQuest[];
