import header from '../../assets/headers/main-header.png';
import './MainHeader.css';


const MainHeader = ({ headerText }) => {
  return (
    <div className="main-header">
      <img src={header} />
      <div className="main-header-text">{headerText}</div>
    </div>
  );
}

export default MainHeader;
