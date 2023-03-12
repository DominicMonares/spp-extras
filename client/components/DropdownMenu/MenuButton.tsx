import { useEffect, useState } from 'react';
import { MenuButtonProps } from '../../types';
import arrow from '../../assets/buttons/arrow.png';
import './DropdownMenu.css';


const MenuButton = ({ items, selected, subHovering }: MenuButtonProps) => {
  const [hovering, setHovering] = useState<string>('');

  useEffect(() => subHovering ? setHovering('-hovering') : setHovering(''));

  return (
    <button
      className={`dd-main-button${hovering}`}
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
