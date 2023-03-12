import { useEffect, useState } from 'react';
import { MenuButtonProps } from '../../types';
import arrow from '../../assets/buttons/arrow.png';
import './DropdownMenu.css';


const MenuButton = ({ dropdown, items, selected, subHovering }: MenuButtonProps) => {
  const [hovering, setHovering] = useState<string>('');

  useEffect(() => subHovering ? setHovering('-hovering') : setHovering(''));

  return (
    <button
      className={`dd-main-button${hovering}`}
      type="button"
      aria-haspopup="menu"
      aria-expanded={dropdown ? 'true' : 'false'}
      onMouseEnter={() => setHovering('-hovering')}
      onMouseLeave={() => setHovering('')}
    >
      <img className={`dd-arrow${hovering}`} src={arrow} />
      <div className={`dd-main-button-text${hovering}`}>
        {selected() ? selected() : items.title}
      </div>
    </button>
  );
}

export default MenuButton;
