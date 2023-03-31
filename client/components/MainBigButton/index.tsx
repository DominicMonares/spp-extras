import { useState } from 'react';
import { MainButtonProps } from '../../types';
import './MainBigButton.css';


const MainBigButton = ({ active, handleClick, buttonText }: MainButtonProps) => {
  const [hovering, setHovering] = useState<string>('');

  return (
    <button
      className={`
        main-big-button
        ${hovering ? 'main-big-hovering' : ''}
        ${active ? 'main-big-active' : ''}
      `}
      onClick={handleClick}
      onMouseEnter={() => setHovering('-hovering')}
      onMouseLeave={() => setHovering('')}
    >
      <div className={`
        main-big-button-text
        ${hovering ? 'main-big-text-hovering' : ''}
        ${active ? 'main-big-text-active' : ''}
      `}>
        {buttonText.split(' ')[0]}
      </div>
      <div className={`
        main-big-button-text-bottom
        ${hovering ? 'main-big-text-hovering-bottom' : ''}
        ${active ? 'main-big-text-active-bottom' : ''}
      `}>
        {buttonText.split(' ')[1]}
      </div>
    </button>
  );
}

export default MainBigButton;
