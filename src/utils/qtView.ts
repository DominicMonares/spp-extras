import {
  AllCompletedQuests,
  AllTemplateQuests,
  CharacterQuests,
  Faction,
  QuestConditions,
  QuestRaceIDs,
  QuestTrackerSettings,
  QuestTypeSetting,
  RepeatQuestFlags,
  SortViewQuests,
  ViewQuest,
  ViewQuests,
  ViewZones,
} from 'types';
import _questRaceIDs from '../../data/quests/questRaceIDs.json';
import _repeatQuestFlags from '../../data/quests/repeatQuestFlags.json';
import _zones from '../../data/zones/zones.json';
import devQuestKeywords from '../../data/quests/devQuestKeywords.json';

// Different quest types have multiple different flags in DB
// Use those flag values to find quest type
const repeatQuestFlags = _repeatQuestFlags as RepeatQuestFlags;

// Required quest races can come in a variety of combinations
// i.e. Alliance, Horde, Orc, Troll-Tauren, All, etc.
const questRaceIDs = _questRaceIDs as QuestRaceIDs;

// Some zones have multiple subzone IDs
const zones = _zones as ViewZones;

// Decide which quests to display
export const filterTemplateQuests = (
  settings: QuestTrackerSettings,
  faction: Faction,
  templateQuests: AllTemplateQuests | Record<string,never>,
) => {
  const { all, characterClass, race, type, zone } = settings;

  // Add template quests that meet all conditions to view quests
  const viewQuests: ViewQuests = [];
  const template = {
    ...templateQuests[faction ? faction : 'neutral'],
    ...templateQuests['neutral'],
  };

  for (const q in template) {
    const quest = template[q];
    const questClass = quest.RequiredClasses;
    const questRace = quest.RequiredRaces;
    const entry = quest.entry;

    // Check to see if quests match the conditions specified in the Quest Tracker settings
    const conditions: QuestConditions = {
      characterClass: {
        setting: characterClass,
        conditionMet: () => {
          // Look for exact class match
          let completeMatch = true;
          const classExists = Object.keys(characterClass).length;
          const classesMatch = characterClass?.value === questClass;
          if (classExists && !classesMatch) completeMatch = false;
          return completeMatch;
        },
      },
      race: {
        setting: race,
        conditionMet: () => {
          // Look for race match in each race array
          let completeMatch = true;
          const currentRaceIds = questRaceIDs[questRace]['raceIds'];
          const raceExists = Object.keys(race).length;
          const raceIncluded = currentRaceIds.includes(race?.id);
          const racesMatch = raceIncluded && currentRaceIds.length <= 3;
          if (raceExists && !racesMatch) completeMatch = false;
          return completeMatch;
        },
      },
      type: {
        setting: type,
        conditionMet: () => {
          // Look for exact quest type match
          if (type === 'regular' || type === 'daily' || type === 'weekly') {
            // The 4 monthly quests are marked as regular in template
            if (entry >= 9884 && entry <= 9887) return false;
            return repeatQuestFlags[type].includes(quest.QuestFlags);
          } else if (type === 'monthly') {
            // Only 4 monthly quests prior to patch 4.3
            return entry >= 9884 && entry <= 9887 ? true : false;
          } else {
            return true;
          }
        },
      },
      zone: {
        setting: zone,
        conditionMet: () => {
          // Look for exact zone match
          const zoneIds = zone ? zones[zone].map((s) => s.subzoneId) : false;
          return zoneIds ? zoneIds.includes(quest.ZoneOrSort) : false;
        },
      },
    };

    // Run all conditions
    let conditionsMet = true;
    for (const c in conditions) {
      const conditionSetting = conditions[c]['setting'];
      const conditionMet = conditions[c]['conditionMet']();
      if (conditionSetting && !conditionMet) conditionsMet = false;
    }

    // Remove unused/dev quests
    const keywordsExist = devQuestKeywords.some((k: string) => quest.Title.includes(k));
    if (keywordsExist) conditionsMet = false;

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
  return viewQuests.sort((a: ViewQuest, b: ViewQuest) => {
    if (sortSetting === 'name') {
      // Sort by alphabetical order
      return sortTitle(a.Title, b.Title);
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
        return sortTitle(a.Title, b.Title);
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

// Used for descending column sort
export const reverseSortViewQuests: SortViewQuests = (viewQuests, sortSetting) => {
  return viewQuests.sort((a: ViewQuest, b: ViewQuest) => {
    if (sortSetting === 'name') {
      // Sort by alphabetical order
      return reverseSortTitle(a.Title, b.Title);
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
        return reverseSortTitle(a.Title, b.Title);
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  });
}

// Mark sorted template quests as complete or incomplete
export const markTemplateQuests = (
  characterQuests: CharacterQuests,
  filteredTemplateQuests: ViewQuests,
  type: QuestTypeSetting,
) => {
  // Consolidate all quests into one object
  const allCharacterQuests = {
    ...characterQuests?.regular,
    ...characterQuests?.daily,
    ...characterQuests?.weekly,
    ...characterQuests?.monthly,
  };

  const typeExists = type && characterQuests?.[type];
  const typeQuests = typeExists ? characterQuests[type] : allCharacterQuests;
  for (const q in typeQuests) {
    let completedQuestIndex = 0;
    const quest = typeQuests[q];
    const questCompleted = filteredTemplateQuests.some(((q, i) => {
      // quest.quest is essentially quest.entry - named so b/c of legacy DB schema
      const match = q.entry === quest.quest;
      if (match) completedQuestIndex = i;
      return match;
    }));

    if (questCompleted) {
      filteredTemplateQuests[completedQuestIndex]['completed'] = true;
    }
  }

  return filteredTemplateQuests;
}

// Create list of quests to be displayed
export const createViewQuests = (
  settings: QuestTrackerSettings,
  faction: Faction,
  completedQuests: AllCompletedQuests | Record<string,never>,
  templateQuests: AllTemplateQuests | Record<string,never>,
) => {
  const { character, type } = settings as QuestTrackerSettings;

  // Create list of quests filtered using quest tracker settings
  const filteredTemplateQuests = filterTemplateQuests(settings, faction, templateQuests);

  // Mark completed quests, check neutral factions so neutral quests are marked
  if (character?.id) {
    const characterQuests = completedQuests[faction][character.id];
    markTemplateQuests(characterQuests, filteredTemplateQuests, type);
  } else {
    const allCompletedQuests = {
      ...completedQuests['alliance'],
      ...completedQuests['horde']
    };

    for (const c in allCompletedQuests) {
      markTemplateQuests(allCompletedQuests[c], filteredTemplateQuests, type);
    }
  }

  return filteredTemplateQuests;
}
