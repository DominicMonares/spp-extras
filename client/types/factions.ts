export type Faction = 'alliance' | 'horde' | '';

export interface FactionSliceState {
  selected: Faction;
}
