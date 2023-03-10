import Tab from './Tab';
import { useAppSelector } from '../../store/hooks';
import { TabsProps, SelectedExpansion} from "../../types";
import './ExpansionNav.css';


const Tabs = ({ openModal }: TabsProps) => {
  const expansion = useAppSelector(state => state.expansion.selected);
  
  const expansionActive = (xpac: SelectedExpansion) => xpac === expansion ? '-active' : '';
  const expansions = {
    classic: expansionActive('classic'),
    tbc: expansionActive('tbc'),
    wotlk: expansionActive('wotlk')
  };

  return (
    <nav className="xpac-tabs">
      <span className="left-buffer classic-lb">
        <div className="square classic-color"></div>
        <div className={`curve ${expansion}-flc`}></div>
      </span>
      <Tab active={expansions.classic} expansion={'classic'} openModal={openModal} />
      {expansion === 'classic' ? (
        <span className="right-buffer classic-rb">
          <div className="square classic-color"></div>
          <div className="curve classic-rc"></div>
        </span>
      ) : (
        <span className="left-buffer tbc-lb">
          <div className="square tbc-color tbc-left-sq"></div>
          <div className="curve tbc-lc"></div>
        </span>
      )}
      <Tab active={expansions.tbc} expansion={'tbc'} openModal={openModal} />
      {expansion === 'wotlk' ? (
        <span className="left-buffer wotlk-lb">
          <div className="square wotlk-color wotlk-left-sq"></div>
          <div className="curve wotlk-lc"></div>
        </span>
      ) : (
        <span className="right-buffer tbc-rb">
          <div className="square tbc-color tbc-right-sq"></div>
          <div className="curve tbc-rc"></div>
        </span>
      )}
      <Tab active={expansions.wotlk} expansion={'wotlk'} openModal={openModal} />
      <span className="right-buffer wotlk-rb">
        <div className="square wotlk-color"></div>
        <div className={`curve ${expansion}-frc`}></div>
      </span>
    </nav>
  );
}

export default Tabs;
