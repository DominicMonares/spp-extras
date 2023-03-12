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

  return (
    <>
      {final ? (
        <button className="dd-sub-button" onClick={handleSelection}>
          {title}
        </button>
      ) : (
        <button className="dd-sub-button">
          {title}
        </button>
      )}
    </>
  );
}

export default SubmenuButton;
