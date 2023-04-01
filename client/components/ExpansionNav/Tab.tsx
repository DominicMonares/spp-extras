import { useAppSelector } from '../../store/hooks';
import { TabProps } from "../../types";
import vanillaTab from '../../assets/tabs/vanilla.png';
import tbcTab from '../../assets/tabs/tbc.png';
import wotlkTab from '../../assets/tabs/wotlk.png';
import './ExpansionNav.css';


const Tab = ({ bufferHover, openModal, xpac }: TabProps) => {
  const expansion = useAppSelector(state => state.expansion.selected);

  const tabImg = () => {
    if (xpac === 'classic') {
      return vanillaTab;
    } else if (xpac === 'tbc') {
      return tbcTab;
    } else {
      return wotlkTab;
    }
  }

  return (
    <button
      className={`
        ${xpac}-tab
        ${expansion === xpac ? `${xpac}-tab-active` : ''}
        ${xpac}-gradient
      `}
      onClick={() => openModal(xpac)}
    >
      <img
        className={`
          ${xpac}-label
          ${expansion === xpac || bufferHover ? `${xpac}-label-active` : ''}
        `}
        src={tabImg()}
      />
    </button>
  );
}

export default Tab;
