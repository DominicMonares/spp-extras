import { MainButtonProps } from '../../types';
import './MainBigButton.css';


const MainBigButton = ({ active, handleClick, buttonText }: MainButtonProps) => {
  return (
    <button
      className={`
        main-big-btn
        ${active ? 'main-big-btn-active' : ''}
      `}
      onClick={handleClick}
    >
      <div className={`
        main-big-btn-text
        ${active ? 'main-big-btn-text-active' : ''}
      `}>
        {buttonText.split(' ')[0]}
      </div>
      <div className={`
        main-big-btn-text-bottom
        ${active ? 'main-big-btn-text-bottom-active' : ''}
      `}>
        {buttonText.split(' ')[1]}
      </div>
    </button>
  );
}

export default MainBigButton;
