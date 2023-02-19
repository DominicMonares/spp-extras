import {
  characterMenu,
  classMenu,
  questTypeMenu,
  raceMenu,
  zoneMenu
} from '../../client/utils';
import { 
  Characters,
  ClassSetting, 
  Menu, 
  RaceSetting
} from '../../client/types';
import _classMenu from '../../data/classMenu.json';
import _raceMenu from '../../data/raceMenu.json';
import _questTypes from '../../data/questTypeMenu.json';
import _zoneMenu from '../../data/zoneMenu.json';
import _sampleCharacters from '../samples/characters.json';
import sampleCharacterMenus from '../samples/characterMenus.json';
import sampleCharacterSettings from '../samples/characterSettings.json';
import sampleClasses from '../samples/classes.json';
import sampleRaces from '../samples/races.json';


const sampleCharacters = _sampleCharacters as Characters;
const { currentCharacterMenu, noCharacterMenu } = sampleCharacterMenus;
const { orcCharacter } = sampleCharacterSettings;
const { paladin } = sampleClasses;
const { orc } = sampleRaces;

describe('characterMenu', () => {
  it('should create a menu with two characters if no character provided', () => {
    const result = characterMenu(undefined, sampleCharacters, 'horde');
    expect(result).toStrictEqual(noCharacterMenu);
  });


  it('should create a menu with an all characters option and unselected characters', () => {
    const result = characterMenu(orcCharacter, sampleCharacters, 'horde');
    expect(result).toStrictEqual(currentCharacterMenu);
  });
});


describe('classMenu', () => {
  let menu: Menu, submenu: Menu | undefined;
  beforeEach(() => {
    menu = JSON.parse(JSON.stringify(_classMenu));
    submenu = menu[0]?.submenu;
  });

  it('should not render the all classes option if no class selected', () => {
    submenu?.shift();
    const result = classMenu('wotlk', 'horde', undefined);
    expect(result).toStrictEqual(menu);
  });


  it('should not render the shaman option if on classic, alliance, and no class selected', () => {
    submenu?.splice(0, 2);
    submenu?.splice(6, 1);
    const result = classMenu('classic', 'alliance', undefined);
    expect(result).toStrictEqual(menu);
  });


  it('should not render the death knight option if not on wotlk and no class selected', () => {
    submenu?.splice(0, 2);
    const result = classMenu('tbc', 'horde', undefined);
    expect(result).toStrictEqual(menu);
  });


  it('should render all classes option and not render paladin option when class selected', () => {
    submenu?.splice(5, 1);
    const result = classMenu('wotlk', 'horde', paladin as ClassSetting);
    expect(result).toStrictEqual(menu);
  })
});


describe('raceMenu', () => {
  let menu: Menu, submenu: Menu | undefined;
  beforeEach(() => {
    menu = JSON.parse(JSON.stringify(_raceMenu)).horde;
    submenu = menu[0]?.submenu;
  });


  it('should not render the all races option if no race selected', () => {
    submenu?.shift();
    const result = raceMenu('wotlk', 'horde', undefined);
    expect(result).toStrictEqual(menu);
  });


  it('should not render the blood elf option if on classic and no race selected', () => {
    submenu?.splice(0, 2);
    const result = raceMenu('classic', 'horde', undefined);
    expect(result).toStrictEqual(menu);
  });


  it('should render all races option and not orc option when race selected', () => {
    submenu?.splice(2, 1);
    const result = raceMenu('wotlk', 'horde', orc as RaceSetting);
    expect(result).toStrictEqual(menu);
  });
});


describe('questTypeMenu', () => {
  let menu: Menu, submenu: Menu | undefined;
  beforeEach(() => {
    menu = JSON.parse(JSON.stringify(_questTypes));
    submenu = menu[0]?.submenu;
  });

  it('should not render the all quest types option if no type selected', () => {
    submenu?.shift();
    const result = questTypeMenu('wotlk', undefined);
    expect(result).toStrictEqual(menu);
  });


  it('should not render the daily and monthly options if on classic and no type selected', () => {
    submenu?.shift();
    submenu?.splice(1, 1);
    submenu?.pop();
    const result = questTypeMenu('classic', undefined);
    expect(result).toStrictEqual(menu);
  });


  it('should render all types option and not regular option when regular type selected', () => {
    submenu?.splice(1, 1);
    const result = questTypeMenu('tbc', 'regular');
    expect(result).toStrictEqual(menu);
  });
});


describe('zoneMenu', () => {
  let menu: Menu, submenu: Menu | undefined;
  beforeEach(() => {
    menu = JSON.parse(JSON.stringify(_zoneMenu));
    submenu = menu[0]?.submenu;
  });

  it('should not render all zones option if no zone selected', () => {
    submenu?.shift();
    const result = zoneMenu('wotlk', undefined);
    expect(result).toStrictEqual(menu);
  });


  it('should not render tbc and wotlk zones if on classic and no zone selected', () => {
    submenu?.shift();
    submenu?.[0].submenu?.splice(2, 2);
    submenu?.[1].submenu?.splice(2, 2);
    submenu?.[2].submenu?.splice(2, 2);
    submenu?.[3].submenu?.splice(2, 2);
    submenu?.[0].submenu?.[0].submenu?.splice(13, 2);
    submenu?.[0].submenu?.[0].submenu?.splice(15, 1);
    submenu?.[0].submenu?.[0].submenu?.splice(18, 1);
    submenu?.[0].submenu?.[1].submenu?.splice(2, 2);
    submenu?.[0].submenu?.[1].submenu?.splice(18, 1);
    const result = zoneMenu('classic', undefined);
    expect(result).toStrictEqual(menu);
  });


  it('should not render tbc if on tbc and no zone selected', () => {
    submenu?.shift();
    submenu?.[0].submenu?.splice(3, 1);
    submenu?.[1].submenu?.splice(3, 1);
    submenu?.[2].submenu?.splice(3, 1);
    submenu?.[3].submenu?.splice(3, 1);
    const result = zoneMenu('tbc', undefined);
    expect(result).toStrictEqual(menu);
  });

  
  it('should render all zones option and not zone if zone selected', () => {
    if (submenu?.[0].title) submenu[0].submenu = undefined;
    submenu?.[1].submenu?.[0].submenu?.splice(17, 1);
    const zone = 'Isle of Quel\'Danas'
    const result = zoneMenu('wotlk', zone);
    expect(result).toStrictEqual(menu);
  });
});
