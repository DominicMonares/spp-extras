type Faction = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 10 | 11;

export const faction = (race: Faction) => {
  if (race === 1 || race === 3 || race === 4 || race === 7 || race === 11) {
    return 'alliance';
  } else {
    return 'horde';
  }
}
