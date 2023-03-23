import { useState } from 'react';
import { WoWButtonProps } from '../../types';
import './WoWButton.css';


const WoWButton = ({ active, handleClick }: WoWButtonProps) => {
  const [hovering, setHovering] = useState<string>('');

  return (
    <button
      className={`
        wow-button 
        ${hovering ? 'wow-hovering' : ''} 
        ${active ? 'wow-active' : ''}
      `}
      onClick={handleClick}
      onMouseEnter={() => setHovering('-hovering')}
      onMouseLeave={() => setHovering('')}
    >
      <div className={`
        wow-button-text 
        ${hovering ? 'wow-text-hovering' : ''} 
        ${active ? 'wow-text-active' : ''}
      `}>
        Quest Tracker
      </div>
    </button>
  );
}

export default WoWButton;
