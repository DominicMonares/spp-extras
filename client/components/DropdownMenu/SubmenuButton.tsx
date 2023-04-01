import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import arrow from '../../assets/buttons/arrow.png';
import { SubmenuButtonProps } from '../../types';
import './DropdownMenu.css';


const SubmenuButton = ({
  final,
  handleSelection,
  subHovering,
  item
}: SubmenuButtonProps) => {
  const smallWindow = useAppSelector(state => state.window.smallWindow);
  const [hovering, setHovering] = useState<string>('');
  useEffect(() => subHovering ? setHovering('-hovering') : setHovering(''));
  const longTitle = item.title.length > 25 ? 'dd-long-sub-text' : '';

  return (
    <button
      id={item.id ? item.id.toString() : ''}
      className={`dd-sub-button${hovering}`}
      value={item.value ? item.value : ''}
      onClick={final ? handleSelection : () => null}
      onMouseEnter={() => setHovering('-hovering')}
      onMouseLeave={() => setHovering('')}
    >
      {!final && !smallWindow ? <img className="dd-sub-arrow" src={arrow} /> : <></>}
      <li
        id={item.id ? item.id.toString() : ''}
        className={`dd-sub-button-text ${longTitle}`}
        value={item.value ? item.value : ''}
      >
        {item.title}
      </li>
      {!final && smallWindow ? <img className="dd-sub-arrow-sm" src={arrow} /> : <></>}
    </button>
  );
}

export default SubmenuButton;
