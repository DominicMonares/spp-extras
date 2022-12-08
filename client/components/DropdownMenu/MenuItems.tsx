// React
import { useState, MouseEvent } from 'react';

// Redux
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateQTZone } from '../../store/slices/questTrackerSlice';

// Components
import Dropdown from './Dropdown';

// Types
import { Submenu, DropdownType } from '../../types/dropdown';

// Styling
import './DropdownMenu.css';


interface Props {
  type: DropdownType,
  items: Submenu,
  depthLevel: number
}

const MenuItems = ({ type, items, depthLevel }: Props) => {
  const dispatch = useAppDispatch();
  const zone = useAppSelector(state => state.questTracker.zone);
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

  const selectionHandler = (e: MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (type === 'zone') {
      dispatch(updateQTZone({ zone: target.innerText }));
    }

    setDropdown(!dropdown)
  }

  return (
    <li
      className='menu-items'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {items.submenu ? (
        <>
          <button
            type='button'
            aria-haspopup='menu'
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => setDropdown(!dropdown)}
          >
            {depthLevel > 0 ? <span>&laquo;</span> : <></>}
            {depthLevel === 0 ? (
              <>{zone ? <>{zone}</> : <>{items.title}</>}</>
            ) : (
              <>{items.title}</>
            )}
            {depthLevel === 0 ? <span className='arrow' /> : <></>}
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
            type='button'
            aria-haspopup='menu'
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={selectionHandler}
          >
            {items.title}
          </button>
        </>
      )}
    </li>
  );
};

export default MenuItems;
