import { AllCharacters } from './characters';

// ----------------------------------------------------------------
// Characters Sorted By Account
// ----------------------------------------------------------------

export type AccountCharsNode = {
  username: string;
  characters: AllCharacters;
  playerAcctIDs?: number[];
}

export type AccountCharacters = {
  [key: string]: AccountCharsNode;
}
