import { useEffect, useState } from 'react';
import { MenuButtonProps } from '../../types';
import arrow from '../../assets/buttons/arrow.png';
import './DropdownMenu.css';


const MenuButton = ({ selected, subHovering, title }: MenuButtonProps) => {
  const [hovering, setHovering] = useState<string>('');
  useEffect(() => subHovering ? setHovering('-hovering') : setHovering(''));
  const titleClass = () => {
    const titleLength = selected() ? selected().length : title.length;
    const short = titleLength <= 9 ? '-short' : '';
    const lowerMid = titleLength > 9 && titleLength <= 12 ? '-lower-mid' : '';
    const mid = titleLength > 12 && titleLength <= 15 ? '-mid' : '';
    const upperMid = titleLength > 15 && titleLength <= 17 ? '-upper-mid' : ''; 
    const long = titleLength > 17 && titleLength <= 21 ? '-long' : '';
    const extraLong = titleLength > 21 && titleLength <= 24 ? '-extra-long' : ''; 
    const jumbo = titleLength > 24 ? '-jumbo' : '';
    return `dd-button-text${short}${lowerMid}${mid}${upperMid}${long}${extraLong}${jumbo}`;
  }

  return (
    <button
      className={`dd-main-button${hovering}`}
      onMouseEnter={() => setHovering('-hovering')}
      onMouseLeave={() => setHovering('')}
    >
      <img className={`dd-main-arrow${hovering}`} src={arrow} />
      <div className={`${titleClass()}${hovering}`}>
        {selected() ? selected() : title}
      </div>
    </button>
  );
}

export default MenuButton;
