import classMenu from '../../data/menus/classMenu.json';
import questTypeMenu from '../../data/menus/questTypeMenu.json';
import raceMenu from '../../data/menus/raceMenu.json';
import zoneMenu from '../../data/menus/zoneMenu.json';
import {
  AllCharacters,
  ClassSetting,
  ExpansionSetting,
  Faction,
  QuestTypeSetting,
  RaceSetting,
} from 'types';

// Create character menu from player character data
export const createCharacterMenu = (
  character: number,
  characters: AllCharacters,
  faction: Faction,
) => {
  const submenu = Object.values(characters[faction]).map(c => {
    const value = { characterClass: c.class, race: c.race };
    return { title: c.name, id: c.guid, value: JSON.stringify(value) };
  });

  // Create reset option if a character is selected
  if (character) {
    submenu.unshift({
      title: 'All Characters',
      id: 0,
      value: '{ "characterClass": 0, "race": 0 }',
    });
  }

  return [{
    title: 'Characters',
    submenu: submenu.filter(s => s.id !== character),
  }];
}

// Create class menu based on expansion and faction data
export const createClassMenu = (
  expansion: ExpansionSetting,
  faction: Faction,
  characterClass: ClassSetting,
) => {
  return [{
    title: classMenu[0]['title'],
    submenu: classMenu[0]['submenu'].filter(c => {
      // Do not include Alliance Shamans or Horde Paladins when Vanilla selected
      const onAlliance = faction === 'alliance';
      const onHorde = faction === 'horde';
      const paladin = c.id === 2;
      const shaman = c.id === 7;
      const noAllianceMatch = onAlliance && shaman;
      const noHordeMatch = onHorde && paladin;
      if (expansion === 'classic' && (noAllianceMatch || noHordeMatch)) return false;

      // Do not include Death Knights if WotLK not selected
      const deathKnight = c.id === 6;
      if (expansion !== 'wotlk' && deathKnight) return false;

      let noClassMatch = c.id !== characterClass;
      let noClassSelected = !characterClass && !c.id;
      return noClassMatch && noClassSelected ? false : noClassMatch;
    })
  }];
}

// Create race menu using expansion and faction data
export const createRaceMenu = (
  expansion: ExpansionSetting,
  faction: Faction,
  race: RaceSetting | Record<string,never>,
) => {
  const raceMenuFaction = raceMenu[faction][0];
  return [{
    title: raceMenuFaction.title,
    submenu: raceMenuFaction.submenu.filter(r => {
      // Do not include Blood Elves or Draenei when Vanilla selected
      const nonVanillaRace = r.id === 10 || r.id === 11;
      if (expansion === 'classic' && nonVanillaRace) return false;

      const noRaceMatch = r.id !== race;
      const noRaceSelected = !race && !r.id;
      return noRaceMatch && noRaceSelected ? false : noRaceMatch;
    }),
  }];
}

// Create quest type menu using expansion data
export const createQuestTypeMenu = (
  expansion: ExpansionSetting,
  type: QuestTypeSetting,
) => {
  return [{
    title: questTypeMenu[0]['title'],
    submenu: questTypeMenu[0]['submenu'].filter(t => {
      // Do not include daily or monthly quests if Vanilla not selected
      const nonVanillaType = t.title === 'Daily' || t.title === 'Monthly';
      if (nonVanillaType && expansion === 'classic') return false;

      const noTypeMatch = t.title.toLowerCase() !== type;
      const noTypeSelected = !type && t.title === 'All Quest Types';
      return noTypeMatch && noTypeSelected ? false : noTypeMatch;
    }),
  }];
}

// Create zone menu using expansion data
export const createZoneMenu = (
  expansion: ExpansionSetting,
  zone: string,
) => {
  const menu = [{
    title: zoneMenu[0]['title'],
    submenu: zoneMenu[0]['submenu'].map(w => {
      return {
        title: w.title,
        submenu: w.submenu?.map(c => {
          return {
            title: c.title,
            submenu: c.submenu.filter(z => {
              // Do not include new Eastern Kingdoms or Kalimdor zones if Vanilla selected
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
            }),
          };
        }).filter(f => {
          const onOutland = f.title === 'Outland';
          const onNorthrend = f.title === 'Northrend';

          // Do not include Outland or Northrend if Vanilla selected
          if (expansion === 'classic' && (onOutland || onNorthrend)) return false;

          // Do not include Northrend if TBC selected
          if (expansion === 'tbc' && onNorthrend) return false;
          return true;
        })
      };
    })
  }];

  if (!zone) menu[0]['submenu'].shift();
  return menu;
}
