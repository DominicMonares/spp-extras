import './MainButton.css';

interface Props {
  active?: string;
  handleClick: () => void;
  buttonText: string;
}

const MainButton = ({ active, handleClick, buttonText }: Props) => {
  const prefs = buttonText === 'Preferences';

  return (
    <button
      className={`
        ${prefs ? 'prefs-btn' : 'main-btn'}
        ${active && prefs ? 'prefs-btn-active' : ''}
        ${active && !prefs ? 'main-btn-active' : ''}
      `}
      onClick={handleClick}
    >
      <div className={`
        ${prefs ? 'prefs-btn-text' : 'main-btn-text'}
        ${active && prefs ? 'prefs-btn-text-active' : ''}
        ${active && !prefs ? 'main-btn-text-active' : ''}
      `}>
        {buttonText}
      </div>
    </button>
  );
}

export default MainButton;
