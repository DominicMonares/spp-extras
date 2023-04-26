import _classMenu from '../../data/menus/classMenu.json';
import _raceMenu from '../../data/menus/raceMenu.json';
import { 
  Account,
  Accounts,
  CharacterSetting,
  ClassSetting,
  Faction, 
  Race, 
  RaceSetting 
} from '../types';


export const checkClass = (character: CharacterSetting) => {
  // Value is an object string containing race/class
  const charClass = JSON.parse(character.value).characterClass;
  const classes = _classMenu[0]['submenu'];

  // Use currently selected class setting to obtain template class data
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
  // Value is an object string containing race/class
  const race = JSON.parse(character.value).race;
  const races = _raceMenu[faction][0]['submenu'];

  // Use currently selected race setting to obtain template race data
  for (const r of races) if (r.id === race) return r as RaceSetting;
}

export const createPlayerCharacters = (accounts: Accounts) => {
  const playerCharacters = { alliance: {}, horde: {} };
  Object.values(accounts).forEach((a: Account) => {
    if (!a.username.includes('RNDBOT')) {
      const allianceChars = a.characters.alliance;
      const hordeChars = a.characters.horde;
      playerCharacters.alliance = { ...playerCharacters.alliance, ...allianceChars };
      playerCharacters.horde = { ...playerCharacters.horde, ...hordeChars };
    }
  });

  return playerCharacters;
}
