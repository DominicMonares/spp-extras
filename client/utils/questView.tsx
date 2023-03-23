import {
  CreateViewQuests,
  FilterQuests,
  MarkTemplateQuests,
  QuestConditions,
  QuestFlags,
  QuestRaces,
  SortViewQuests,
  ViewQuests,
  ViewSubzone,
  ViewZones
} from "../types";
import _questRaces from '../../data/questRaces.json';
import repeatQuestFlags from '../../data/repeatQuestFlags.json';
import zoneRef from '../../data/zoneRef.json';


export const createViewQuests: CreateViewQuests = (completedQuests, settings, templateQuests) => {
  const { faction, type, character } = settings;
  const filteredTemplateQuests = filterTemplateQuests(settings, templateQuests);

  // Mark completed quests, check both factions so neutral quests are marked
  if (character && character.id) {
    const characterQuests = completedQuests[faction][character.id];
    markTemplateQuests(characterQuests, filteredTemplateQuests, type);
  } else {
    const allCompletedQuests = { ...completedQuests['alliance'], ...completedQuests['horde'] };
    for (const c in allCompletedQuests) {
      markTemplateQuests(allCompletedQuests[c], filteredTemplateQuests, type);
    }
  }

  return filteredTemplateQuests;
}

export const filterTemplateQuests: FilterQuests = (settings, templateQuests) => {
  const { faction, type, zone, characterClass, race } = settings;
  const questFlags = repeatQuestFlags as QuestFlags;
  const questRaces = _questRaces as QuestRaces;
  const zones = zoneRef as ViewZones;

  // Add template quests that meet conditions to render object
  const quests: ViewQuests = [];

  // Add template quests that meet conditions to render object
  const template = { ...templateQuests[faction], ...templateQuests['both'] };
  for (const q in template) {
    const quest = template[q];
    const questClass = quest.requiredclasses;
    const questRace = quest.requiredraces;
    const entry = quest.entry;
    
    const conditions: QuestConditions = {
      characterClass: {
        setting: characterClass,
        conditionMet: () => {
          let completeMatch = true;
          const classesMatch = characterClass?.value === questClass;
          const racesMatch = questRaces[questRace]['raceIds'][0] === race?.id;
          if (!classesMatch) completeMatch = false;
          if (race && !racesMatch) completeMatch = false;
          return completeMatch;
        }
      },
      race: {
        setting: race,
        conditionMet: () => {
          if (!characterClass && !quest.requiredclasses && race) {
            return questRaces[questRace]['raceIds'][0] === race?.id;
          } else if (characterClass && race) {
            return questRaces[questRace]['raceIds'].includes(race?.id);
          }
        }
      },
      type: {
        setting: type,
        conditionMet: () => {
          if (type === 'regular' || type === 'daily' || type === 'weekly') {
            // The 4 monthly quests are marked as regular in template
            if (entry >= 9884 && entry <= 9887) return false;
            return questFlags[type].includes(quest.questflags);
          } else if (type === 'monthly') {
            // Only 4 monthly quests prior to patch 4.3
            if (entry >= 9884 && entry <= 9887) return true;
          } else {
            return true;
          }
        }
      },
      zone: {
        setting: zone,
        conditionMet: () => {
          const zoneIds = zone ? zones[zone].map((s: ViewSubzone) => s.subzoneId) : false;
          return zoneIds ? zoneIds.includes(quest.zoneorsort) : false;
        }
      }
    };

    let conditionsMet = true;
    for (const c in conditions) {
      const conditionSetting = conditions[c]['setting'];
      const conditionMet = conditions[c]['conditionMet']();
      if (conditionSetting && !conditionMet) conditionsMet = false;
    }

    if (conditionsMet) quests.push({ ...quest, completed: false });
  }

  return quests;
}

export const sortTitle = (a: string, b: string) => {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
}

export const sortViewQuests: SortViewQuests = (viewQuests, sortSetting) => {
  return viewQuests.sort((a, b) => {
    if (sortSetting === 'name') {
      return sortTitle(a.title, b.title);
    } else if (sortSetting === 'id') {
      if (a.entry > b.entry) {
        return 1;
      } else if (a.entry < b.entry) {
        return -1;
      } else {
        return 0;
      }
    } else if (sortSetting === 'status') {
      if (!a.completed && b.completed) {
        return 1;
      } else if (a.completed && !b.completed) {
        return -1;
      } else if ((a.completed && b.completed) || (!a.completed && !b.completed)) {
        return sortTitle(a.title, b.title);
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  });
}

export const reverseSortTitle = (a: string, b: string) => {
  if (a < b) {
    return 1;
  } else if (a > b) {
    return -1;
  } else {
    return 0;
  }
}

export const reverseSortViewQuests: SortViewQuests = (viewQuests, sortSetting) => {
  return viewQuests.sort((a, b) => {
    if (sortSetting === 'name') {
      return reverseSortTitle(a.title, b.title);
    } else if (sortSetting === 'id') {
      if (a.entry < b.entry) {
        return 1;
      } else if (a.entry > b.entry) {
        return -1;
      } else {
        return 0;
      }
    } else if (sortSetting === 'status') {
      if (a.completed && !b.completed) {
        return 1;
      } else if (!a.completed && b.completed) {
        return -1;
      } else if ((a.completed && b.completed) || (!a.completed && !b.completed)) {
        return reverseSortTitle(a.title, b.title);
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  });
}

export const markTemplateQuests: MarkTemplateQuests = (
  characterQuests,
  filteredTemplateQuests,
  type
) => {
  const allCharacterQuests = {
    ...characterQuests.regular,
    ...characterQuests.daily,
    ...characterQuests.weekly,
    ...characterQuests.monthly
  }

  const typeQuests = type ? characterQuests[type] : allCharacterQuests;
  for (const q in typeQuests) {
    const quest = typeQuests[q];
    if (filteredTemplateQuests[quest.quest]) {
      filteredTemplateQuests[quest.quest]['completed'] = true;
    }
  }

  return filteredTemplateQuests;
}
