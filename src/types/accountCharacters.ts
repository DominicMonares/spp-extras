import { Characters } from "./characters";

// ----------------------------------------------------------------
// Characters Sorted By Account
// ----------------------------------------------------------------

export type AccountCharsNode = {
  username: string;
  characters: Characters;
}

export type AccountCharacters = {
  [key: number]: AccountCharsNode;
}
