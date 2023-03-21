import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { MenuButtonProps } from '../../types';
import arrow from '../../assets/buttons/arrow.png';
import './DropdownMenu.css';


const MenuButton = ({ selected, subHovering, title }: MenuButtonProps) => {
  const smallWindow = useAppSelector(state => state.window.smallWindow);
  const size = smallWindow ? '-sm' : '';
  const [hovering, setHovering] = useState<string>('');
  useEffect(() => subHovering ? setHovering('-hovering') : setHovering(''));
  
  const titleLength = () => {
    const titleLen = selected() ? selected().length : title.length;
    return titleLen <= 12 ? 12 : titleLen;
  }

  return (
    <button
      className={`dd-main-button${hovering}`}
      onMouseEnter={() => setHovering('-hovering')}
      onMouseLeave={() => setHovering('')}
    >
      <div className="dd-main-button-content">
        {!smallWindow ? <img className={`dd-main-arrow${hovering}`} src={arrow} /> : <></>}
        <div className={`c${titleLength()}${hovering} c${size}`}>
          {selected() ? selected() : title}
        </div>
        {smallWindow ? <img className={`dd-main-arrow-sm${hovering}`} src={arrow} /> : <></>}
      </div>
    </button>
  );
}

export default MenuButton;
