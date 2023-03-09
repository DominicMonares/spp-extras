import { useAppSelector } from '../../store/hooks';
import {
  TabsProps,
  SelectedExpansion
} from "../../types";
import vanillaTab from '../../assets/labels/vanilla.png';
import tbcTab from '../../assets/labels/tbc.png';
import wotlkTab from '../../assets/labels/wotlk.png';
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
      <span className={`classic-tab${expansions.classic} classic-gradient`}>
        <button className="classic-label" onClick={() => openModal('classic')}>
          <img className={expansions.classic ? '' : 'label-inactive'} src={vanillaTab} />
        </button>
      </span>
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
      <span className={`tbc-tab${expansions.tbc} tbc-gradient`}>
        <button className="tbc-label" onClick={() => openModal('tbc')}>
          <img className={expansions.tbc ? '' : 'label-inactive'} src={tbcTab} />
        </button>
      </span>
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
      <span className={`wotlk-tab${expansions.wotlk} wotlk-gradient`}>
        <button className="wotlk-label" onClick={() => openModal('wotlk')}>
          <img className={expansions.wotlk ? '' : 'label-inactive'} src={wotlkTab} />
        </button>
      </span>
      <span className="right-buffer wotlk-rb">
        <div className="square wotlk-color"></div>
        <div className={`curve ${expansion}-frc`}></div>
      </span>
    </nav>
  );
}

export default Tabs;
