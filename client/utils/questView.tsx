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


export const filterTemplateQuests: FilterQuests = (all, settings, templateQuests) => {
  const { characterClass, faction, race, type, zone } = settings;

  // Different quest types have multiple different flags in DB
  // Use those flag values to find quest type
  const questFlags = repeatQuestFlags as QuestFlags; 

  // Required quest races can come in a variety of combinations
  // i.e. Alliance, Horde, Orc, Troll-Tauren, All, etc.
  const questRaces = _questRaces as QuestRaces;

  // Some zones have multiple subzone IDs
  const zones = zoneRef as ViewZones;
  
  // Add template quests that meet all conditions to view quests
  const viewQuests: ViewQuests = [];
  const template = { ...templateQuests[faction], ...templateQuests['both'] };
  for (const q in template) {
    const quest = template[q];
    const questClass = quest.requiredclasses;
    const questRace = quest.requiredraces;
    const entry = quest.entry;

    // Check to see if quests match the conditions specified in the Quest Tracker settings
    const conditions: QuestConditions = {
      characterClass: {
        setting: characterClass,
        conditionMet: () => {
          // Look for exact class match
          let completeMatch = true;
          const classesMatch = characterClass?.value === questClass;
          if (characterClass && !classesMatch) completeMatch = false;
          return completeMatch;
        }
      },
      race: {
        setting: race,
        conditionMet: () => {
          // Look for race match in each race array
          let completeMatch = true;
          const currentRaceIds = questRaces[questRace]['raceIds'];
          const racesMatch = currentRaceIds.includes(race?.id) && currentRaceIds.length <= 3;
          if (race && !racesMatch) completeMatch = false;
          return completeMatch;
        }
      },
      type: {
        setting: type,
        conditionMet: () => {
          // Look for exact quest type match
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
          // Look for exact zone match
          const zoneIds = zone ? zones[zone].map((s: ViewSubzone) => s.subzoneId) : false;
          return zoneIds ? zoneIds.includes(quest.zoneorsort) : false;
        }
      }
    };

    // Run all conditions
    let conditionsMet = true;
    if (!all) {
      for (const c in conditions) {
        const conditionSetting = conditions[c]['setting'];
        const conditionMet = conditions[c]['conditionMet']();
        if (conditionSetting && !conditionMet) conditionsMet = false;
      }
    }

    // Add quest to viewQuests if conditions are met
    if (conditionsMet) viewQuests.push({ ...quest, completed: false });
  }

  return viewQuests;
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

// Used for ascending column sort
export const sortViewQuests: SortViewQuests = (viewQuests, sortSetting) => {
  return viewQuests.sort((a, b) => {
    if (sortSetting === 'name') {
      // Sort by alphabetical order
      return sortTitle(a.title, b.title);
    } else if (sortSetting === 'id') {
      // Sort by numerical order
      if (a.entry > b.entry) {
        return 1;
      } else if (a.entry < b.entry) {
        return -1;
      } else {
        return 0;
      }
    } else if (sortSetting === 'status') {
      // Sort by completed status
      if (!a.completed && b.completed) {
        return 1;
      } else if (a.completed && !b.completed) {
        return -1;
      } else if ((a.completed && b.completed) || (!a.completed && !b.completed)) {
        return sortTitle(a.title, b.title);
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

// Used for descending column sort
export const reverseSortViewQuests: SortViewQuests = (viewQuests, sortSetting) => {
  return viewQuests.sort((a, b) => {
    if (sortSetting === 'name') {
      // Sort by alphabetical order
      return reverseSortTitle(a.title, b.title);
    } else if (sortSetting === 'id') {
      // Sort by numerical order
      if (a.entry < b.entry) {
        return 1;
      } else if (a.entry > b.entry) {
        return -1;
      } else {
        return 0;
      }
    } else if (sortSetting === 'status') {
      // Sort by completed status
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

// Mark sorted template quests as complete or incomplete
export const markTemplateQuests: MarkTemplateQuests = (
  characterQuests,
  filteredTemplateQuests,
  type
) => {
  // Consolidate all quests into one object
  const allCharacterQuests = {
    ...characterQuests.regular,
    ...characterQuests.daily,
    ...characterQuests.weekly,
    ...characterQuests.monthly
  }

  const typeQuests = type ? characterQuests[type] : allCharacterQuests;
  for (const q in typeQuests) {
    let completedQuestIndex: number;
    const quest = typeQuests[q];

    const questCompleted = filteredTemplateQuests.some(((q, i) => {
      // quest.quest is essentially quest.entry - named so b/c of DB schema
      const match = q.entry === quest.quest;
      if (match) completedQuestIndex = i;
      return match;
    }))

    if (questCompleted) {
      filteredTemplateQuests[completedQuestIndex]['completed'] = true;
    }
  }

  return filteredTemplateQuests;
}

// Create list of quests to be displayed
export const createViewQuests: CreateViewQuests = (
  all, 
  completedQuests, 
  settings, 
  templateQuests
) => {
  const { character, type } = settings;

  // Create list of quests filtered using quest tracker settings
  const filteredTemplateQuests = filterTemplateQuests(all, settings, templateQuests);

  // Mark completed quests, check both factions so neutral quests are marked
  if (character && character.id) {
    const characterQuests = completedQuests[settings.faction][character.id];
    markTemplateQuests(characterQuests, filteredTemplateQuests, type);
  } else {
    const allCompletedQuests = { ...completedQuests['alliance'], ...completedQuests['horde'] };
    for (const c in allCompletedQuests) {
      markTemplateQuests(allCompletedQuests[c], filteredTemplateQuests, type);
    }
  }

  return filteredTemplateQuests;
}
