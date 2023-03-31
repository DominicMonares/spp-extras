import { useState } from 'react';
import { TabProps } from "../../types";
import vanillaTab from '../../assets/tabs/vanilla.png';
import tbcTab from '../../assets/tabs/tbc.png';
import wotlkTab from '../../assets/tabs/wotlk.png';
import './ExpansionNav.css';

const Tab = ({ active, expansion, openModal }: TabProps) => {
  const [hovering, setHovering] = useState<string>('');

  const tabImg = () => {
    if (expansion === 'classic') {
      return vanillaTab;
    } else if (expansion === 'tbc') {
      return tbcTab;
    } else {
      return wotlkTab;
    }
  }

  return (
    <button
      className={`${expansion}-tab${hovering}${active} ${expansion}-gradient`}
      onClick={() => openModal(expansion)}
      onMouseEnter={() => setHovering('-hovering')}
      onMouseLeave={() => setHovering('')}
    >
      <img className={`${expansion}-label${hovering}${active}`} src={tabImg()} />
    </button>
  );
}

export default Tab;
