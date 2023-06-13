import arrow from '../../../../assets/buttons/collapse-arrow.webp';
import './MainHeader.css';

type Props = {
  collapsed: boolean;
  headerText: string;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainHeader = ({ collapsed, headerText, setCollapsed }: Props) => {
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
