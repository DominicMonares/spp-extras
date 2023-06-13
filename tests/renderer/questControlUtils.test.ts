import {
  createCharacterMenu,
  createClassMenu,
  createQuestTypeMenu,
  createRaceMenu,
  createZoneMenu
} from 'utils';
import {
  AllCharacters,
  ClassSetting,
  Menu,
  RaceSetting
} from 'types';
import classMenu from '../../data/menus/classMenu.json';
import questTypes from '../../data/menus/questTypeMenu.json';
import raceMenu from '../../data/menus/raceMenu.json';
import sampleAccounts from '../samples/formattedData/allAccountsChars.json';
import sampleCharacterMenus from '../samples/renderer/characterMenus.json';
import sampleCharacterSettings from '../samples/renderer/characterSettings.json';
import sampleClasses from '../samples/renderer/classes.json';
import sampleRaces from '../samples/renderer/races.json';
import zoneMenu from '../../data/menus/zoneMenu.json';

const sampleCharacters = sampleAccounts[0]['characters'] as AllCharacters;
const { currentCharacterMenu, noCharacterMenu } = sampleCharacterMenus;
const { orcCharacter } = sampleCharacterSettings;
const { paladin } = sampleClasses;
const { orc } = sampleRaces;

describe('createCharacterMenu', () => {
  it('should create a menu with three characters if no character provided', () => {
    const result = createCharacterMenu(0, sampleCharacters, 'horde');
    const expected = noCharacterMenu;
    expect(result).toStrictEqual(expected);
  });

  it('should create a menu with an all characters option and unselected characters', () => {
    const result = createCharacterMenu(orcCharacter.id, sampleCharacters, 'horde');
    const expected = currentCharacterMenu;
    expect(result).toStrictEqual(expected);
  });
});

describe('createClassMenu', () => {
  let menu: Menu, submenu: Menu | undefined;
  beforeEach(() => {
    menu = JSON.parse(JSON.stringify(classMenu));
    submenu = menu[0]?.submenu;
  });

  it('should not render the all classes option if no class selected', () => {
    submenu?.shift();
    const result = createClassMenu('wotlk', 'horde', 0);
    const expected = menu;
    expect(result).toStrictEqual(expected);
  });

  it('should not render the shaman option if on classic, alliance, and no class selected', () => {
    submenu?.splice(0, 2);
    submenu?.splice(6, 1);
    const result = createClassMenu('classic', 'alliance', 0);
    const expected = menu;
    expect(result).toStrictEqual(expected);
  });

  it('should not render the death knight option if not on wotlk and no class selected', () => {
    submenu?.splice(0, 2);
    const result = createClassMenu('tbc', 'horde', 0);
    const expected = menu;
    expect(result).toStrictEqual(expected);
  });

  it('should render all classes option and not render paladin option when class selected', () => {
    submenu?.splice(5, 1);
    const result = createClassMenu('wotlk', 'horde', paladin.id as ClassSetting);
    const expected = menu;
    expect(result).toStrictEqual(expected);
  });
});

describe('createRaceMenu', () => {
  let menu: Menu, submenu: Menu | undefined;
  beforeEach(() => {
    menu = JSON.parse(JSON.stringify(raceMenu)).horde;
    submenu = menu[0]?.submenu;
  });

  it('should not render the all races option if no race selected', () => {
    submenu?.shift();
    const result = createRaceMenu('wotlk', 'horde', 0);
    const expected = menu;
    expect(result).toStrictEqual(expected);
  });

  it('should not render the blood elf option if on classic and no race selected', () => {
    submenu?.splice(0, 2);
    const result = createRaceMenu('classic', 'horde', 0);
    const expected = menu;
    expect(result).toStrictEqual(expected);
  });

  it('should render all races option and not orc option when race selected', () => {
    submenu?.splice(2, 1);
    const result = createRaceMenu('wotlk', 'horde', orc.id as RaceSetting);
    const expected = menu;
    expect(result).toStrictEqual(expected);
  });
});

describe('createQuestTypeMenu', () => {
  let menu: Menu, submenu: Menu | undefined;
  beforeEach(() => {
    menu = JSON.parse(JSON.stringify(questTypes));
    submenu = menu[0]?.submenu;
  });

  it('should not render the all quest types option if no type selected', () => {
    submenu?.shift();
    const result = createQuestTypeMenu('wotlk', '');
    const expected = menu;
    expect(result).toStrictEqual(expected);
  });

  it('should not render the daily and monthly options if on classic and no type selected', () => {
    submenu?.shift();
    submenu?.splice(1, 1);
    submenu?.pop();
    const result = createQuestTypeMenu('classic', '');
    const expected = menu;
    expect(result).toStrictEqual(expected);
  });

  it('should render all types option and not regular option when regular type selected', () => {
    submenu?.splice(1, 1);
    const result = createQuestTypeMenu('tbc', 'regular');
    const expected = menu;
    expect(result).toStrictEqual(expected);
  });
});

describe('createZoneMenu', () => {
  let menu: Menu, submenu: Menu | undefined;
  beforeEach(() => {
    menu = JSON.parse(JSON.stringify(zoneMenu));
    submenu = menu[0]?.submenu;
  });

  it('should not render all zones option if no zone selected', () => {
    submenu?.shift();
    const result = createZoneMenu('wotlk', '');
    const expected = menu;
    expect(result).toStrictEqual(expected);
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
    const result = createZoneMenu('classic', '');
    const expected = menu;
    expect(result).toStrictEqual(expected);
  });

  it('should not render tbc if on tbc and no zone selected', () => {
    submenu?.shift();
    submenu?.[0].submenu?.splice(3, 1);
    submenu?.[1].submenu?.splice(3, 1);
    submenu?.[2].submenu?.splice(3, 1);
    submenu?.[3].submenu?.splice(3, 1);
    const result = createZoneMenu('tbc', '');
    const expected = menu;
    expect(result).toStrictEqual(expected);
  });

  it('should render all zones option and not zone if zone selected', () => {
    if (submenu?.[0].title) submenu[0].submenu = undefined;
    submenu?.[1].submenu?.[0].submenu?.splice(17, 1);
    const zone = 'Isle of Quel\'Danas'
    const result = createZoneMenu('wotlk', zone);
    const expected = menu;
    expect(result).toStrictEqual(expected);
  });
});
