// ----------------------------------------------------------------
// JSON Data
// ----------------------------------------------------------------

export type Title = {
  name: string;
  inGameOrder: number;
}

export type Titles = {
  [key: string]: Title;
}
