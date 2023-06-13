import { useState } from 'react';
import DropdownMenu from './index';
import MenuButton from './MenuButton';
import SubmenuButton from './SubmenuButton';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import {
  storeQuestTrackerCharacter,
  storeQuestTrackerClass,
  storeQuestTrackerRace,
  storeQuestTrackerType,
  storeQuestTrackerZone,
} from 'renderer/store/slices';
import {
  CharacterClass,
  DropdownType,
  QuestTypeSetting,
  Race,
  Submenu,
} from 'types';
import './DropdownMenu.css';

type Props = {
  dropdownType: DropdownType;
  items: Submenu;
  depthLevel: number | undefined;
}

const MenuItems = ({ dropdownType, items, depthLevel }: Props) => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(state => state.questTracker);
  const { character, characterClass, race, type, zone } = settings;

  // Determine whether a menu/submenu should be rendered or not
  const [dropdown, setDropdown] = useState<boolean>(false);

  // Track nested hovering - keeps parent elements hovering when children are hovering
  const [subHovering, setSubHovering] = useState<boolean>(true);

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
  const handleSelection = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    const target = e.target as HTMLInputElement;
    const title = target.innerText;
    const id = Number(target.id);
    const value = target.value;

    if (dropdownType === 'character') {
      dispatch(storeQuestTrackerCharacter({
        id: id,
        name: title,
        value: value,
      }));
    } else if (dropdownType === 'type') {
      dispatch(storeQuestTrackerType(title as QuestTypeSetting));
    } else if (dropdownType === 'zone') {
      dispatch(storeQuestTrackerZone(title));
    } else if (dropdownType === 'class') {
      dispatch(storeQuestTrackerClass({
        id: id as CharacterClass,
        title: title,
        value: Number(value),
      }));
    } else if (dropdownType === 'race') {
      dispatch(storeQuestTrackerRace({
        id: id as Race,
        title: title,
        value: Number(value),
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
    } else if (dropdownType === 'class' && Object.keys(characterClass).length) {
      return characterClass.title;
    } else if (dropdownType === 'race' && Object.keys(race).length) {
      return race.title;
    } else {
      return '';
    }
  }

  return (
    <ul
      className="menu-items"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {items.submenu ? (
        <li>
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
        </li>
      ) : (
        <li>
          <SubmenuButton
            final={true}
            handleSelection={handleSelection}
            subHovering={subHovering}
            item={items}
          />
        </li>
      )}
    </ul>
  );
};

export default MenuItems;
