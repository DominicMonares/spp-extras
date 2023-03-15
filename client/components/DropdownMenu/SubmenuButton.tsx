import { useEffect, useState } from 'react';
import { SubmenuButtonProps } from '../../types';
import arrow from '../../assets/buttons/arrow.png';
import './DropdownMenu.css';


const SubmenuButton = ({
  final,
  handleSelection,
  subHovering,
  item
}: SubmenuButtonProps) => {
  const [hovering, setHovering] = useState<string>('');
  useEffect(() => subHovering ? setHovering('-hovering') : setHovering(''));
  const longTitle = item.title.length > 25 ? 'long-sub-text' : '';

  return (
    <button
      id={item.id ? item.id.toString() : ''}
      className={`dd-sub-button${hovering}`}
      value={item.value ? item.value : ''}
      onClick={final ? handleSelection : () => null}
      onMouseEnter={() => setHovering('-hovering')}
      onMouseLeave={() => setHovering('')}
    >
      {!final ? <img className="dd-sub-arrow" src={arrow} /> : <></>}
      <li
        id={item.id ? item.id.toString() : ''}
        className={`dd-sub-button-text${hovering} ${longTitle}`}
        value={item.value ? item.value : ''}
      >
        {item.title}
      </li>
    </button>
  );
}

export default SubmenuButton;
