import _classMenu from '../../data/classMenu.json';
import _questTypeMenu from '../../data/questTypeMenu.json';
import _raceMenu from '../../data/raceMenu.json';
import _zoneMenu from '../../data/zoneMenu.json';
import {
  FilteredCharacterMenu,
  FilteredClassMenu,
  FilteredQuestTypeMenu,
  FilteredRaceMenu,
  FilteredZoneMenu,
} from "../types";


export const characterMenu: FilteredCharacterMenu = (character, characters, faction) => {
  const submenu = Object.values(characters[faction]).map(c => {
    const value = { characterClass: c.class_field, race: c.race };
    return { title: c.name, id: c.guid, value: JSON.stringify(value) };
  });

  if (character) {
    submenu.unshift({
      title: 'All Characters',
      id: 0,
      value: '{ "characterClass": 0, "race": 0 }'
    });
  }

  return [{
    title: 'Characters',
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
