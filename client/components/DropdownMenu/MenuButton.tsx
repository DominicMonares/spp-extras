import { useEffect, useState } from 'react';
import { MenuButtonProps } from '../../types';
import arrow from '../../assets/buttons/arrow.png';
import './DropdownMenu.css';


const MenuButton = ({ selected, subHovering, title }: MenuButtonProps) => {
  const [hovering, setHovering] = useState<string>('');
  useEffect(() => subHovering ? setHovering('-hovering') : setHovering(''));
  
  const titleClass = () => {
    const titleLength = selected() ? selected().length : title.length;
    return titleLength <= 12 ? 12 : titleLength;
  }

  return (
    <button
      className={`dd-main-button${hovering}`}
      onMouseEnter={() => setHovering('-hovering')}
      onMouseLeave={() => setHovering('')}
    >
      <img className={`dd-main-arrow${hovering}`} src={arrow} />
      <div className={`c${titleClass()}${hovering}`}>
        {selected() ? selected() : title}
      </div>
    </button>
  );
}

export default MenuButton;
