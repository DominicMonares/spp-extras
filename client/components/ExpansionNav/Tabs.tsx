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
        <li className="buffer">
          <div className="classic-circle"></div>
          <div className="classic-square"></div>
        </li>
        <li
          className={`classic-tab${expansions.classic}`}
          onClick={() => openModal('classic')}
        >
          Vanilla
        </li>
        <li
          className={`tbc-tab${expansions.tbc}`}
          onClick={() => openModal('tbc')}
        >
          The Burning Crusade
        </li>
        <li
          className={`wotlk-tab${expansions.wotlk}`}
          onClick={() => openModal('wotlk')}
        >
          Wrath of the Lich King
        </li>
        <li className="buffer"></li>
      </ol>
    </nav>
  );
}

export default Tabs;
