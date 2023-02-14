import { 
  GetRace, 
  Race, 
  RaceSetting 
} from '../types';
import _raceMenu from '../../data/raceMenu.json';


export const getFaction = (race: Race) => {
  if (race === 1 || race === 3 || race === 4 || race === 7 || race === 11) {
    return 'alliance';
  } else {
    return 'horde';
  }
}

export const getRace: GetRace = (character, faction) => {
  const race = JSON.parse(character.value).race;
  const races = _raceMenu[faction][0]['submenu'];
  for (const r of races) if (r.id === race) return r as RaceSetting;
}
