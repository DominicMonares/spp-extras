import _classMenu from '../../data/classMenu.json';
import _raceMenu from '../../data/raceMenu.json';
import { 
  CharacterSetting,
  ClassSetting,
  Faction, 
  Race, 
  RaceSetting 
} from '../types';


export const checkClass = (character: CharacterSetting) => {
  const charClass = JSON.parse(character.value).characterClass;
  const classes = _classMenu[0]['submenu'];
  for (const c of classes) if (c.id === charClass) return c as ClassSetting;
}

export const checkFaction = (race: Race) => {
  if (race === 1 || race === 3 || race === 4 || race === 7 || race === 11) {
    return 'alliance';
  } else {
    return 'horde';
  }
}

export const checkRace = (character: CharacterSetting, faction: Faction) => {
  const race = JSON.parse(character.value).race;
  const races = _raceMenu[faction][0]['submenu'];
  for (const r of races) if (r.id === race) return r as RaceSetting;
}
