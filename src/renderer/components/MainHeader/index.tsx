import arrow from '../../assets/buttons/collapse-arrow.gif';
import { MainHeaderProps } from '../../types';
import './MainHeader.css';


const MainHeader = ({ collapsed, headerText, setCollapsed }: MainHeaderProps) => {
  return (
    <div className="main-header">
      <div className="main-header-buffer"></div>
      <div className="main-header-label">
        <div className="main-header-text">{headerText}</div>
      </div>
      <img
        className={collapsed ? 'collapsed' : 'expanded'}
        src={arrow}
        onClick={() => setCollapsed(!collapsed)}
      />
    </div>
  ); 
}

export default MainHeader;