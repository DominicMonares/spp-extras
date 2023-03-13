import { useEffect, useState } from 'react';
import { SubmenuButtonProps } from '../../types';
import arrow from '../../assets/buttons/arrow.png';
import './DropdownMenu.css';


const SubmenuButton = ({
  final,
  handleSelection,
  subHovering,
  title
}: SubmenuButtonProps) => {
  const [hovering, setHovering] = useState<string>('');
  useEffect(() => subHovering ? setHovering('-hovering') : setHovering(''));
  const longTitle = title.length > 25 ? 'long-sub-text' : '';

  return (
    <button
      className={`dd-sub-button${hovering}`}
      onClick={final ? handleSelection : () => null}
      onMouseEnter={() => setHovering('-hovering')}
      onMouseLeave={() => setHovering('')}
    >
      {!final ? <img className="dd-sub-arrow" src={arrow} /> : <></>}
      <div className={`dd-sub-button-text${hovering} ${longTitle}`}>
        {title}
      </div>

    </button>
  );
}

export default SubmenuButton;
