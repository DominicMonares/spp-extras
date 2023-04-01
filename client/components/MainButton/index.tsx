import { MainButtonProps } from '../../types';
import './MainButton.css';


const MainButton = ({ active, handleClick, buttonText }: MainButtonProps) => {
  return (
    <button
      className={`
        main-btn
        ${active ? 'main-btn-active' : ''}
      `}
      onClick={handleClick}
    >
      <div className={`
        main-btn-text
        ${active ? 'main-btn-text-active' : ''}
      `}>
        {buttonText}
      </div>
    </button>
  );
}

export default MainButton;
