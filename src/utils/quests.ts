import _questRaceZeros from '../../data/quests/questRaceZeros.json';
import {
  AllCharacters,
  AllCompletedQuests,
  AllTemplateQuests,
  CompletedQuests,
  RawComplRepeatQuests,
  RawComplRegQuests,
  Quest,
  QuestRaceZeros,
  QuestType,
  RawTemplateQuests,
} from "../types";

const questRaceZeros = _questRaceZeros as QuestRaceZeros;

// Organize completed quests by character
export const formatCompletedQuests = (
  regular: RawComplRegQuests,
  daily: RawComplRepeatQuests,
  weekly: RawComplRepeatQuests,
  monthly: RawComplRepeatQuests,
) => {
  const all: CompletedQuests = {};
  const addQuest = (quest: Quest, type: QuestType) => {
    const guid = quest.guid.toString();
    const questID = quest.quest.toString();
    if (!all[guid]) {
      all[guid] = {
        regular: {},
        daily: {},
        weekly: {},
        monthly: {}
      };
    }

    if (type === 'regular') all[guid]['regular'][questID] = quest;
    else if (type === 'daily' && daily) all[guid]['daily'][questID] = quest;
    else if (type === 'weekly') all[guid]['weekly'][questID] = quest;
    else if (type === 'monthly' && monthly) all[guid]['monthly'][questID] = quest;
  }

  regular.forEach(q => addQuest(q, 'regular'));
  if (daily) daily.forEach(q => addQuest(q, 'daily'));
  weekly.forEach(q => addQuest(q, 'weekly'));
  if (monthly) monthly.forEach(q => addQuest(q, 'monthly'));

  return all;
}

// Organize completed quests by faction
export const formatComplFactionQuests = (
  characters: AllCharacters,
  completedQuests: CompletedQuests,
) => {
  const all: AllCompletedQuests = { alliance: {}, horde: {} };

  // Gather quests completed only by player characters
  Object.values(characters.alliance).forEach(c => {
    all['alliance'][c.guid] = completedQuests[c.guid];
  });

  Object.values(characters.horde).forEach(c => {
    all['horde'][c.guid] = completedQuests[c.guid];
  });

  return all;
}

// Organize template quests by faction
export const formatTemplateQuests = (quests: RawTemplateQuests) => {
  const all: AllTemplateQuests = {
    alliance: {},
    horde: {},
    neutral: {}
  };

  const alliance = [1, 4, 5, 8, 64, 65, 68, 77, 1101, 1024];
  const horde = [2, 16, 32, 128, 130, 144, 162, 176, 178, 512, 514, 690];
  const neutral = [0, 255, 1791];
  quests.forEach(quest => {
    const reqRaces = quest.RequiredRaces;
    const entry = quest.entry;

    // Some quests with RequiredRaces of 0 are faction specific
    const questFaction = questRaceZeros[entry];
    if (questFaction) {
      all[questFaction][entry] = quest;
      return;
    }

    // Add other quests based on RequiredRaces
    if (alliance.includes(reqRaces)) all['alliance'][entry] = quest;
    else if (horde.includes(reqRaces)) all['horde'][entry] = quest;
    else if (neutral.includes(reqRaces)) all['neutral'][entry] = quest;
  });

  return all;
}
