import { MainButtonProps } from '../../types';
import './MainBigButton.css';


const MainBigButton = ({ active, handleClick, buttonText }: MainButtonProps) => {
  return (
    <button
      className={`
        main-big-button
        ${active ? 'main-big-button-active' : ''}
      `}
      onClick={handleClick}
    >
      <div className={`
        main-big-button-text
        ${active ? 'main-big-text-active' : ''}
      `}>
        {buttonText.split(' ')[0]}
      </div>
      <div className={`
        main-big-button-text-bottom
        ${active ? 'main-big-button-text-bottom-active' : ''}
      `}>
        {buttonText.split(' ')[1]}
      </div>
    </button>
  );
}

export default MainBigButton;
