import { useEffect, useState, MouseEvent } from 'react';
import Dropdown from './Dropdown';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  storeQuestTrackerCharacter,
  storeQuestTrackerClass,
  storeQuestTrackerRace,
  storeQuestTrackerZone
} from '../../store/slices';
import { MenuItemsProps } from '../../types';
import './DropdownMenu.css';


const MenuItems = ({ type, items, depthLevel }: MenuItemsProps) => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(state => state.questTracker);
  const { zone, characterClass, race, character } = settings;
  const [dropdown, setDropdown] = useState(false);

  const onMouseEnter = () => {
    setDropdown(true);
  };

  const onMouseLeave = () => {
    setDropdown(false);
  };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  const handleSelection = (e: MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const title = target.innerText;
    const id = Number(target.id);
    const value = Number(target.value);

    if (type === 'zone') {
      dispatch(storeQuestTrackerZone({ zone: title }));
    } else if (type === 'class') {
      dispatch(storeQuestTrackerClass({
        characterClass: {
          id: id,
          title: title,
          value: value
        }
      }));
    } else if (type === 'race') {
      dispatch(storeQuestTrackerRace({ 
        race: { 
          id: id,
          title: title,
          value: value
        } 
      }));
    } else if (type === 'character') {
      dispatch(storeQuestTrackerCharacter({
        character: {
          id: id,
          name: title
        }
      }));
    }

    setDropdown(!dropdown);
  }

  const selected = () => {
    if (type === 'zone' && zone) {
      return zone;
    } else if (type === 'class' && characterClass) {
      return characterClass.title;
    } else if (type === 'race' && race) {
      return race.title;
    } else if (type === 'character' && character) {
      return character.name;
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
          <button
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
          <Dropdown
            type={type}
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        <>
          <button
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
    </li>
  );
};

export default MenuItems;
