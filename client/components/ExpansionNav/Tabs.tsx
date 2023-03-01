import { useAppSelector } from '../../store/hooks';
import {
  TabsProps,
  SelectedExpansion
} from "../../types";
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
    <nav>
      <ol className="xpac-tabs">
        <li className="left-buffer classic-lb">
          <div className="square classic-color"></div>
          <div className="curve classic-lc"></div>
        </li>
        <li className={`classic-tab${expansions.classic} classic-color`}>
          <button onClick={() => openModal('classic')}>
            Vanilla
          </button>
        </li>
        {expansion === 'classic' ? (
          <li className="right-buffer classic-rb">
            <div className="square classic-color"></div>
            <div className="curve classic-rc"></div>
          </li>
        ) : (
          <li className="left-buffer tbc-lb">
            <div className="square tbc-color tbc-left-sq"></div>
            <div className="curve tbc-lc"></div>
          </li>
        )}
        <li className={`tbc-tab${expansions.tbc} tbc-color`}>
          <button onClick={() => openModal('tbc')}>
            The Burning Crusade
          </button>
        </li>
        {expansion === 'wotlk' ? (
          <li className="left-buffer wotlk-lb">
            <div className="square wotlk-color wotlk-left-sq"></div>
            <div className="curve wotlk-lc"></div>
          </li>
        ) : (
          <li className="right-buffer tbc-rb">
            <div className="square tbc-color tbc-right-sq"></div>
            <div className="curve tbc-rc"></div>
          </li>
        )}
        <li
          className={`wotlk-tab${expansions.wotlk} wotlk-color`}
          onClick={() => openModal('wotlk')}
        >
          Wrath of the Lich King
        </li>
        <li className="right-buffer wotlk-rb">
          <div className="square wotlk-color"></div>
          <div className="curve wotlk-rc"></div>
        </li>
      </ol>
    </nav>
  );
}

export default Tabs;
