import {
  CreateViewQuests,
  Faction,
  FilterQuests,
  FilteredCharacterMenu,
  FilteredClassMenu,
  FilteredQuestTypeMenu,
  FilteredRaceMenu,
  FilteredZoneMenu,
  MarkTemplateQuests,
  QuestConditions,
  QuestFlags,
  QuestRaces,
  ViewQuests,
  ViewSubzone,
  ViewZones
} from "../types";
import _classMenu from '../../data/classMenu.json';
import _questTypeMenu from '../../data/questTypeMenu.json';
import _raceMenu from '../../data/raceMenu.json';
import _zoneMenu from '../../data/zoneMenu.json';
import _questRaces from '../../data/questRaces.json';
import repeatQuestFlags from '../../data/repeatQuestFlags.json';
import zoneRef from '../../data/zoneRef.json';


export const characterMenu: FilteredCharacterMenu = (character, characters, faction) => {
  const submenu = Object.values(characters[faction]).map(c => {
    const value = { characterClass: c.class_field, race: c.race };
    return { title: c.name, id: c.guid, value: JSON.stringify(value) };
  });

  submenu.unshift({
    title: 'All Characters',
    id: 0,
    value: '{ "characterClass": 0, "race": 0 }'
  });

  return [{
    title: 'All Characters',
    submenu: submenu.filter(s => s.id !== character?.id)
  }];
}

export const classMenu: FilteredClassMenu = (expansion, faction, characterClass) => {
  return [{
    title: _classMenu[0]['title'],
    submenu: _classMenu[0]['submenu'].filter(c => {
      const onAlliance = faction === 'alliance';
      const onHorde = faction === 'horde';
      const paladin = c.id === 2;
      const shaman = c.id === 7;
      const noAllianceMatch = onAlliance && shaman;
      const noHordeMatch = onHorde && paladin;
      if (expansion === 'classic' && (noAllianceMatch || noHordeMatch)) return false;

      const deathKnight = c.id === 6;
      if (expansion !== 'wotlk' && deathKnight) return false;

      const noClassMatch = c.id !== characterClass?.id;
      const noClassSelected = !characterClass && !c.id;
      return noClassMatch && noClassSelected ? false : noClassMatch;
    })
  }];
}

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
  const quests: ViewQuests = {};

  // Render quests once faction selected, filter by settings
  if (faction) {
    // Add template quests that meet conditions to render object
    const template = { ...templateQuests[faction], ...templateQuests['both'] };
    for (const q in template) {
      const quest = template[q];
      const questClass = quest.requiredclasses;
      const questRace = quest.requiredraces;
      const questFaction = questRaces[questRace]['faction'] as Faction | 'both';
      const factionMatch = questFaction === faction || questFaction === 'both';

      const conditions: QuestConditions = {
        type: {
          setting: type,
          conditionMet: () => {
            if (type === 'regular' || type === 'daily' || type === 'weekly') {
              return questFlags[type].includes(quest.questflags);
            } else if (type === 'monthly') {
              // Only 4 monthly quests prior to patch 4.3
              const entry = quest.entry;
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
        },
        characterClass: {
          setting: characterClass,
          conditionMet: () => {
            let completeMatch = true;
            const classesMatch = characterClass?.value === questClass;
            const racesMatch = questRaces[questRace]['raceIds'].includes(race?.id);
            if (!classesMatch) completeMatch = false;
            if (race && !racesMatch) completeMatch = false;
            if (!race && !factionMatch) completeMatch = false;
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
        }
      };

      let conditionsMet = true;
      for (const c in conditions) {
        const conditionSetting = conditions[c]['setting'];
        const conditionMet = conditions[c]['conditionMet']();
        if (conditionSetting && !conditionMet) conditionsMet = false;
      }

      if (conditionsMet) quests[q] = { ...quest, completed: false };
    }
  }

  return quests;
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

export const raceMenu: FilteredRaceMenu = (expansion, faction, race) => {
  const raceMenuFaction = _raceMenu[faction][0];
  return [{
    title: raceMenuFaction.title,
    submenu: raceMenuFaction.submenu.filter(r => {
      const nonVanillaRace = r.id === 10 || r.id === 11;
      if (expansion === 'classic' && nonVanillaRace) return false;

      const noRaceMatch = r.id !== race?.id;
      const noRaceSelected = !race && !r.id;
      return noRaceMatch && noRaceSelected ? false : noRaceMatch;
    })
  }];
}

export const questTypeMenu: FilteredQuestTypeMenu = (expansion, type) => {
  return [{
    title: _questTypeMenu[0]['title'],
    submenu: _questTypeMenu[0]['submenu'].filter(t => {
      const nonVanillaType = t.title === 'Daily' || t.title === 'Monthly';
      if (nonVanillaType && expansion === 'classic') return false;

      const noTypeMatch = t.title.toLowerCase() !== type;
      const noTypeSelected = !type && t.title === 'All Quest Types';
      return noTypeMatch && noTypeSelected ? false : noTypeMatch;
    })
  }];
}

export const zoneMenu: FilteredZoneMenu = (expansion, zone) => {
  const menu = [{
    title: _zoneMenu[0]['title'],
    submenu: _zoneMenu[0]['submenu'].map(w => {
      return {
        title: w.title,
        submenu: w.submenu?.map(c => {
          return {
            title: c.title,
            submenu: c.submenu.filter(z => {
              const eversong = z.title === 'Eversong Woods';
              const ghostlands = z.title === 'Ghostlands';
              const isle = z.title === 'Isle of Quel\'Danas';
              const silvermoon = z.title === 'Silvermoon City';
              const azuremyst = z.title === 'Azuremyst Isle';
              const bloodmyst = z.title === 'Bloodmyst Isle';
              const exodar = z.title === 'The Exodar';
              const easternKingdoms = eversong || ghostlands || isle || silvermoon;
              const kalimdor = azuremyst || bloodmyst || exodar;
              const newZones = easternKingdoms || kalimdor;
              return expansion === 'classic' && newZones ? false : z.title !== zone;
            })
          };
        }).filter(f => {
          const onOutland = f.title === 'Outland';
          const onNorthrend = f.title === 'Northrend';
          if (expansion === 'classic' && (onOutland || onNorthrend)) return false;
          if (expansion === 'tbc' && onNorthrend) return false;
          return true;
        })
      };
    })
  }];

  if (!zone) menu[0]['submenu'].shift();
  return menu;
}
