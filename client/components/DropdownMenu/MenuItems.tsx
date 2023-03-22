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
import { MenuItemsProps } from '../../types';
import './DropdownMenu.css';


const MenuItems = ({ dropdownType, items, depthLevel }: MenuItemsProps) => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(state => state.questTracker);
  const { character, characterClass, race, type, zone } = settings;
  const [dropdown, setDropdown] = useState<boolean>(false);
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
      dispatch(storeQuestTrackerType({ type: title }))
    } else if (dropdownType === 'zone') {
      dispatch(storeQuestTrackerZone({ zone: title }));
    } else if (dropdownType === 'class') {
      dispatch(storeQuestTrackerClass({
        characterClass: {
          id: id,
          title: title,
          value: Number(value)
        }
      }));
    } else if (dropdownType === 'race') {
      dispatch(storeQuestTrackerRace({
        race: {
          id: id,
          title: title,
          value: Number(value)
        }
      }));
    }

    setDropdown(!dropdown);
  }

  const selected = () => {
    if (dropdownType === 'character' && character) {
      return character.name;
    } else if (dropdownType === 'type' && type) {
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
              selected={selected}
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
