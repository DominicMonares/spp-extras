import { useAppSelector } from 'renderer/store/hooks';
import { Expansion } from 'types';
import tbcTab from '../../../../assets/tabs/tbc-tab.webp';
import vanillaTab from '../../../../assets/tabs/vanilla-tab.webp';
import wotlkTab from '../../../../assets/tabs/wotlk-tab.webp';
import './ExpansionNav.css';

type Props = {
  bufferHover: boolean;
  openModal: (xpac: Expansion) => void;
  xpac: Expansion;
}

const Tab = ({ bufferHover, openModal, xpac }: Props) => {
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
