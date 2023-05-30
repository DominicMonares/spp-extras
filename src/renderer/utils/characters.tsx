import classMenu from '../../../data/menus/classMenu.json';
import raceMenu from '../../../data/menus/raceMenu.json';
import {
  Faction,
  QTCharacter,
  Race,
} from '../../types';

export const checkClass = (character: QTCharacter) => {
  // Value is an object string containing race/class
  const charClass = JSON.parse(character.value).characterClass;
  const classes = classMenu[0]['submenu'];

  // Use currently selected class setting to obtain template class data
  for (const c of classes) if (c.id === charClass) return c;
}

export const checkFaction = (race: Race) => {
  if (race === 1 || race === 3 || race === 4 || race === 7 || race === 11) {
    return 'alliance';
  } else {
    return 'horde';
  }
}

export const checkRace = (character: QTCharacter, faction: Faction) => {
  // Value is an object string containing race/class
  const race = JSON.parse(character.value).race;
  const races = raceMenu[faction][0]['submenu'];

  // Use currently selected race setting to obtain template race data
  for (const r of races) if (r.id === race) return r;
}
