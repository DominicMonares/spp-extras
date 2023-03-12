import { useState, MouseEvent } from 'react';
import Dropdown from './Dropdown';
import MenuButton from './MenuButton'
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


const MenuItems = ({ questType, items, depthLevel }: MenuItemsProps) => {
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
    dropdown && setDropdown(false);
  };

  const handleSelection = (e: MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const title = target.innerText;
    const id = Number(target.id);
    const value = target.value;

    if (questType === 'character') {
      dispatch(storeQuestTrackerCharacter({
        character: {
          id: id,
          name: title,
          value: value
        }
      }));
    } else if (questType === 'type') {
      dispatch(storeQuestTrackerType({ type: title }))
    } else if (questType === 'zone') {
      dispatch(storeQuestTrackerZone({ zone: title }));
    } else if (questType === 'class') {
      dispatch(storeQuestTrackerClass({
        characterClass: {
          id: id,
          title: title,
          value: Number(value)
        }
      }));
    } else if (questType === 'race') {
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
    if (questType === 'character' && character) {
      return character.name;
    } else if (questType === 'type' && type) {
      return type[0].toUpperCase().concat(type.substring(1));
    } else if (questType === 'zone' && zone) {
      return zone;
    } else if (questType === 'class' && characterClass) {
      return characterClass.title;
    } else if (questType === 'race' && race) {
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
              dropdown={dropdown}
              items={items}
              selected={selected}
              subHovering={subHovering}
            />
          ) : (
            <button
              className={depthLevel === 0 ? 'dd-main-button' : 'dd-sub-button'}
              type="button"
              aria-haspopup="menu"
              aria-expanded={dropdown ? 'true' : 'false'}
              onClick={() => setDropdown(!dropdown)}
            >
              {depthLevel > 0 ? <span>&laquo;</span> : <></>}
              {depthLevel === 0 ? (
                <>{selected() ? selected() : items.title}</>
              ) : (
                <>{items.title}</>
              )}
              {depthLevel === 0 ? <span className="arrow" /> : <></>}
            </button>
          )}
          <Dropdown
            questType={questType}
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        <>
          <button
            className="dd-sub-button"
            type="button"
            id={items.id ? items.id.toString() : ''}
            value={items.value ? items.value : ''}
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={handleSelection}
          >
            {items.title}
          </button>
        </>
      )}
    </li >
  );
};

export default MenuItems;
