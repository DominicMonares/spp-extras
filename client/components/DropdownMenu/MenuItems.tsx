// React
import { useState, useEffect, useRef } from 'react';

// Components
import Dropdown from './Dropdown';

// Styling
import './DropdownMenu.css';


interface Props {
  items: any, // temp any
  depthLevel: number
}

const MenuItems = ({ items, depthLevel }: Props) => {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef() as any; // temp any

  useEffect(() => {
    const handler = (event: any) => { // temp any
      if (
        dropdown &&
        ref.current &&
        !ref.current.contains(event.target)
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
    window.innerWidth > 600 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 600 && setDropdown(false);
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
