import { useState, MouseEvent } from 'react';
import DropdownMenu from './index';
import MenuButton from './MenuButton';
import SubmenuButton from './SubmenuButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  storeQuestTrackerCharacter,
  storeQuestTrackerClass,
  storeQuestTrackerRace,
  storeQuestTrackerType,
  storeQuestTrackerZone
} from '../../store/slices';
import { MenuItemsProps } from '../../../types';
import './DropdownMenu.css';


const MenuItems = ({ dropdownType, items, depthLevel }: MenuItemsProps) => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(state => state.questTracker);
  const { character, characterClass, race, type, zone } = settings;

  // Determine whether a menu/submenu should be rendered or not
  const [dropdown, setDropdown] = useState<boolean>(false);

  // Track nested hovering - keeps parent elements hovering when children are hovering
  const [subHovering, setSubHovering] = useState<boolean>(false);

  const onMouseEnter = () => {
    setDropdown(true);
    setSubHovering(true);
  };

  const onMouseLeave = () => {
    setDropdown(false);
    setSubHovering(false);
  };

  const closeDropdown = () => {
    setDropdown(false);
    setSubHovering(false);
  };

  // Update quest tracker settings depending on the dropdown menu selection
  // Multiple selections can be made at once
  const handleSelection = (e: MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const title = target.innerText;
    const id = Number(target.id);
    const value = target.value;

    if (dropdownType === 'character') {
      dispatch(storeQuestTrackerCharacter({
        character: {
          id: id,
          name: title,
          value: value
        }
      }));
    } else if (dropdownType === 'type') {
      dispatch(storeQuestTrackerType({ type: title as any })) // TEMP ANY
    } else if (dropdownType === 'zone') {
      dispatch(storeQuestTrackerZone({ zone: title }));
    } else if (dropdownType === 'class') {
      dispatch(storeQuestTrackerClass({
        characterClass: {
          id: id,
          title: title,
          value: Number(value)
        } as any, // TEMP ANY
      }));
    } else if (dropdownType === 'race') {
      dispatch(storeQuestTrackerRace({
        race: {
          id: id,
          title: title,
          value: Number(value)
        } as any, // TEMP ANY
      }));
    }

    setDropdown(!dropdown);
  }

  // Returns selected option to be displayed inside of the main button
  const selected = () => {
    if (dropdownType === 'character' && character) {
      return character.name;
    } else if (dropdownType === 'type' && type) {
      // Capitalize first letter of quest type
      return type[0].toUpperCase().concat(type.substring(1));
    } else if (dropdownType === 'zone' && zone) {
      return zone;
    } else if (dropdownType === 'class' && characterClass) {
      return characterClass.title;
    } else if (dropdownType === 'race' && race) {
      return race.title;
    }
  }

  return (
    <li
      className="menu-items"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {items.submenu ? (
        <>
          {depthLevel === 0 ? (
            <MenuButton
              selected={selected as any} // TEMP ANY
              subHovering={subHovering}
              title={items.title}
            />
          ) : (
            <SubmenuButton
              final={false}
              handleSelection={handleSelection}
              subHovering={subHovering}
              item={items}
            />
          )}
          <DropdownMenu
            dropdownType={dropdownType}
            depthLevel={depthLevel}
            menu={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        <SubmenuButton
          final={true}
          handleSelection={handleSelection}
          subHovering={subHovering}
          item={items}
        />
      )}
    </li >
  );
};

export default MenuItems;
