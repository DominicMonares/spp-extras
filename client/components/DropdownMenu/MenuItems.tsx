// React
import { useState, useEffect, useRef } from 'react';

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
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef<HTMLLIElement>();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLInputElement;

      if (
        dropdown &&
        ref.current &&
        !ref.current.contains(target)
      ) {
        setDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    setDropdown(true);
  };

  const onMouseLeave = () => {
    setDropdown(false);
  };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  return (
    <li
      className='menu-items'
      ref={ref}
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
            onClick={() => setDropdown((prev) => !prev)}
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
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.title}
          </button>
        </>
      )}
    </li>
  );
};

export default MenuItems;
