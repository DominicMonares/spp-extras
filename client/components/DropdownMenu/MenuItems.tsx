// React
import { useState, MouseEventHandler, MouseEvent } from 'react';

// Redux
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateQTZone } from '../../store/slices/questTrackerSlice';

// Components
import Dropdown from './Dropdown';

// Types
import { Submenu } from '../../types/dropdown';

// Styling
import './DropdownMenu.css';


interface Props {
  items: Submenu
  depthLevel: number
}

const MenuItems = ({ items, depthLevel }: Props) => {
  const dispatch = useAppDispatch();
  const type = useAppSelector(state => state.dropdown.type);
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
            <div>{items.title}</div>
            {depthLevel === 0 ? <span className='arrow' /> : <></>}
          </button>
          <Dropdown
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
