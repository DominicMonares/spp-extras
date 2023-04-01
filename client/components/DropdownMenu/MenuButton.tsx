import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import arrow from '../../assets/buttons/arrow.png';
import { MenuButtonProps } from '../../types';
import './DropdownMenu.css';


const MenuButton = ({ selected, subHovering, title }: MenuButtonProps) => {
  const smallWindow = useAppSelector(state => state.window.smallWindow);
  const [hovering, setHovering] = useState<string>('');

  // Keep main button hovering if hovering over sub-buttons
  useEffect(() => subHovering ? setHovering('-hovering') : setHovering(''));
  
  // Font size depends on title length
  const titleLength = () => {
    const length = selected() ? selected().length : title.length;
    return length <= 12 ? 12 : length;
  }

  return (
    <button
      className={`dd-main-button${hovering}`}
      onMouseEnter={() => setHovering('-hovering')}
      onMouseLeave={() => setHovering('')}
    >
      <div className="dd-main-button-content">
        {!smallWindow ? <img className={`dd-main-arrow${hovering}`} src={arrow} /> : <></>}
        <div className={`c${titleLength()}${hovering} c${smallWindow ? '-sm' : ''}`}>
          {selected() ? selected() : title}
        </div>
        {smallWindow ? <img className={`dd-main-arrow-sm${hovering}`} src={arrow} /> : <></>}
      </div>
    </button>
  );
}

export default MenuButton;
