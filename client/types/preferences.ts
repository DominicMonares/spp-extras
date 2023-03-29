import { Expansion } from "./expansions";
import { Faction } from "./factions";

export interface ExpansionPreferencesProps {
  setSelectedExpansion: React.Dispatch<React.SetStateAction<Expansion>>;
}

export interface FactionPreferencesProps {
  setSelectedFaction: React.Dispatch<React.SetStateAction<Faction>>;
}

export interface PreferencesProps {
  setInstalled: React.Dispatch<React.SetStateAction<boolean>>;
}
