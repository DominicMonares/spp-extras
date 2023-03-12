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

  return (
    <button
      className={`dd-sub-button${hovering}`}
      onClick={final ? handleSelection : () => null}
      onMouseEnter={() => setHovering('-hovering')}
      onMouseLeave={() => setHovering('')}
    >
      {title}
    </button>
  );
}

export default SubmenuButton;
