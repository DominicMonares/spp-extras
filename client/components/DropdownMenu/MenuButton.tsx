import { useState } from 'react';
import { MenuButtonProps } from '../../types';
import arrow from '../../assets/buttons/arrow.png';
import './DropdownMenu.css';


const MenuButton = ({ dropdown, items, selected }: MenuButtonProps) => {
  const [hovering, setHovering] = useState<string>('');

  return (
    <button
      className={`menu-button${hovering}`}
      type="button"
      aria-haspopup="menu"
      aria-expanded={dropdown ? 'true' : 'false'}
      onMouseEnter={() => setHovering('-hovering')}
      onMouseLeave={() => setHovering('')}
    >
      <img className="arrow" src={arrow} />
      <div className={`menu-button-text${hovering}`}>
        {selected() ? selected() : items.title}
      </div>
    </button>
  );
}

export default MenuButton;
