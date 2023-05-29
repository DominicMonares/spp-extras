import { CreatePlayerQuests } from "../../types";


export const createPlayerQuests: CreatePlayerQuests = (characters, completedQuests) => {
  const all: any = { alliance: {}, horde: {} }; // TEMP ANY

  // Gather quests completed only by player characters
  Object.values(characters.alliance).forEach(c => {
    all['alliance'][c.guid] = completedQuests[c.guid];
  });

  Object.values(characters.horde).forEach(c => {
    all['horde'][c.guid] = completedQuests[c.guid];
  });

  return all;
}
