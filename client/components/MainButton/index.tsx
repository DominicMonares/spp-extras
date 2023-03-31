import { useState } from 'react';
import { MainButtonProps } from '../../types';
import './MainButton.css';


const MainButton = ({ active, handleClick, buttonText }: MainButtonProps) => {
  const [hovering, setHovering] = useState<string>('');

  return (
    <button
      className={`
        main-button
        ${hovering ? 'main-hovering' : ''}
        ${active ? 'main-active' : ''}
      `}
      onClick={handleClick}
      onMouseEnter={() => setHovering('-hovering')}
      onMouseLeave={() => setHovering('')}
    >
      <div className={`
        main-button-text
        ${hovering ? 'main-text-hovering' : ''}
        ${active ? 'main-text-active' : ''}
      `}>
        {buttonText}
      </div>
    </button>
  );
}

export default MainButton;
