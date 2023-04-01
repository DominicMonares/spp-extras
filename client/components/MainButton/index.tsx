import { MainButtonProps } from '../../types';
import './MainButton.css';


const MainButton = ({ active, handleClick, buttonText }: MainButtonProps) => {
  return (
    <button
      className={`
        main-button
        ${active ? 'main-button-active' : ''}
      `}
      onClick={handleClick}
    >
      <div className={`
        main-button-text
        ${active ? 'main-text-active' : ''}
      `}>
        {buttonText}
      </div>
    </button>
  );
}

export default MainButton;
