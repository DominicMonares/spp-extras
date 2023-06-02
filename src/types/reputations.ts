import { Faction } from "./characters";

// ----------------------------------------------------------------
// Reputations
// ----------------------------------------------------------------

export type Reputation = {
  standing: number;
  flags: number;
}

export type Reputations = {
  [key: string]: Reputation;
}

export type AllReputations = {
  [key: string]: Reputations;
}

export type StandingsFlags = {
  alliance: Reputations;
  horde: Reputations;
  neutral: Reputations;
}

// ----------------------------------------------------------------
// JSON Data
// ----------------------------------------------------------------

export type CityRep = {
  name: string;
  maxStanding: number;
}

export type RaceRep = {
  [key: string]: CityRep | string;
}

export type MaxRaceReps = {
  [key: string]: RaceRep;
}

export type ReputationTemplate = {
  [key: string]: {
    name: string;
    charFaction: Faction;
  }
}
