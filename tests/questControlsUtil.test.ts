import {
  characterMenu,
  classMenu,
  raceMenu
} from '../client/utils';
import { 
  ClassSetting, 
  Menu, 
  RaceSetting
} from '../client/types';
import {
  currentCharacterMenu,
  noCharacterMenu,
  orc,
  orcCharacter,
  paladin,
  storedCharacters
} from './samples';
import _classMenu from '../data/classMenu.json';
import _raceMenu from '../data/raceMenu.json';


describe.only('TEMP WRAPPER ', () => {
  describe('characterMenu', () => {
    it('should create a menu with two characters if no character provided', () => {
      const result = characterMenu(undefined as never, storedCharacters, 'horde');
      expect(result).toStrictEqual(noCharacterMenu);
    });
  

    it('should create a menu with an all characters option and unselected characters', () => {
      const result = characterMenu(orcCharacter, storedCharacters, 'horde');
      expect(result).toStrictEqual(currentCharacterMenu);
    });
  });
  

  describe('classMenu', () => {
    let classes: Menu;
    beforeEach(() => classes = JSON.parse(JSON.stringify(_classMenu)));

    it('should not render the all classes option if no class selected', () => {
      classes[0]?.submenu?.shift();
      const result = classMenu('wotlk', 'horde', undefined as never);
      expect(result).toStrictEqual(classes);
    });


    it('should not render the shaman option if on classic, alliance, and no class selected', () => {
      classes[0]?.submenu?.splice(0, 2);
      classes[0]?.submenu?.splice(6, 1);
      const result = classMenu('classic', 'alliance', undefined as never);
      expect(result).toStrictEqual(classes);
    });


    it('should not render the death knight option if not on wotlk and no class selected', () => {
      classes[0]?.submenu?.splice(0, 2);
      const result = classMenu('tbc', 'horde', undefined as never);
      expect(result).toStrictEqual(classes);
    });


    it('should render all classes option and not render paladin option when class selected', () => {
      classes[0]?.submenu?.splice(5, 1);
      const result = classMenu('wotlk', 'horde', paladin as ClassSetting);
      expect(result).toStrictEqual(classes);
    })
  });


  describe('raceMenu', () => {
    let races: Menu;
    beforeEach(() => races = JSON.parse(JSON.stringify(_raceMenu)).horde);


    it('should not render the all races option if no race selected', () => {
      races[0]?.submenu?.shift();
      const result = raceMenu('wotlk', 'horde', undefined as never);
      expect(result).toStrictEqual(races);
    });


    it('should not render the blood elf option if on classic and no race selected', () => {
      races[0]?.submenu?.splice(0, 2);
      const result = raceMenu('classic', 'horde', undefined as never);
      expect(result).toStrictEqual(races);
    });


    it('should render all races option and not orc option when race selected', () => {
      races[0]?.submenu?.splice(2, 1);
      const result = raceMenu('wotlk', 'horde', orc as RaceSetting);
      expect(result).toStrictEqual(races);
    });
  });
})
