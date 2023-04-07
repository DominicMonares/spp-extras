import header from '../../assets/headers/main-big-header.png';
import './MainBigHeader.css';


const MainBigHeader = ({ headerText }) => {
  return (
    <div className="main-big-header">
      <img src={header} />
      <div className={`
        main-big-header-text 
        ${headerText.includes('Loading') ? 'loading-text' : ''}
      `}>
        {headerText}
      </div>
    </div>
  );
}

export default MainBigHeader;
