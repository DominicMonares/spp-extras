import { MainButtonProps } from '../../types';
import './MainBigButton.css';


const MainBigButton = ({ active, handleClick, buttonText }: MainButtonProps) => {
  const splitText = buttonText.split(' ');

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
        {splitText[0]}
      </div>
      <div className={`
        main-big-btn-text-bottom
        ${active ? 'main-big-btn-text-bottom-active' : ''}
      `}>
        {splitText.slice(1).join(' ')}
      </div>
    </button>
  );
}

export default MainBigButton;
