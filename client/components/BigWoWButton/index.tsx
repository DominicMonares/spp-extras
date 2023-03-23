import { useState } from 'react';
import { WoWButtonProps } from '../../types';
import './BigWoWButton.css';


const WoWButton = ({ active, handleClick, buttonText }: WoWButtonProps) => {
  const [hovering, setHovering] = useState<string>('');

  return (
    <button
      className={`
        big-wow-button 
        ${hovering ? 'big-wow-hovering' : ''} 
        ${active ? 'big-wow-active' : ''}
      `}
      onClick={handleClick}
      onMouseEnter={() => setHovering('-hovering')}
      onMouseLeave={() => setHovering('')}
    >
      <div className={`
        big-wow-button-text 
        ${hovering ? 'big-wow-text-hovering' : ''} 
        ${active ? 'big-wow-text-active' : ''}
      `}>
        {buttonText.split(' ')[0]}
      </div>
      <div className={`
        big-wow-button-text-bottom
        ${hovering ? 'big-wow-text-hovering-bottom' : ''} 
        ${active ? 'big-wow-text-active-bottom' : ''}
      `}>
        {buttonText.split(' ')[1]}
      </div>
    </button>
  );
}

export default WoWButton;
