import './MainBigHeader.css';


const MainBigHeader = ({ headerText }) => {
  return (
    <div className="main-big-header">
      <div className="main-big-header-label">
        <div className={`
          main-big-header-text 
          ${headerText.includes('Loading') ? 'loading-text' : ''}
        `}>
          {headerText}
        </div>
      </div>
    </div>
  );
}

export default MainBigHeader;
