import {
  characterMenu,
  classMenu
} from '../client/utils';
import {
  currentCharacterMenu,
  noCharacterMenu,
  orcCharacter,
  paladin,
  storedCharacters
} from './samples';
import _classMenu from '../data/classMenu.json';
import { ClassSetting, Menu } from '../client/types';


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
})
