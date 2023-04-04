import arrow from '../../assets/buttons/collapse-arrow.gif';
import header from '../../assets/headers/main-header.png';
import { MainHeaderProps } from '../../types';
import './MainHeader.css';


const MainHeader = ({ collapsed, headerText, setCollapsed }: MainHeaderProps) => {
  return (
    <div className="main-header">
      <div className="main-header-label">
        <img src={header} />
        <div className="main-header-text">{headerText}</div>
      </div>
      <div className="collapse-arrow">
        <img
          className={collapsed ? 'collapsed' : 'expanded'}
          src={arrow}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>
    </div>
  );
}

export default MainHeader;
