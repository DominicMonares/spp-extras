import { useEffect, useState } from 'react';
import MainButton from '../MainButton';
import MainHeader from '../MainHeader';
import Tool from './Tool';
import { useAppSelector } from 'renderer/store/hooks';
import './Tools.css';

type Props = {
  setInstalled: React.Dispatch<React.SetStateAction<boolean>>;
}

const Tools = ({ setInstalled }: Props) => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const tool = useAppSelector(state => state.tool.selected);
  const windowHeight = useAppSelector(state => state.window.windowHeight);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  // Collapse Tools menu if window height decreases past a certain point
  useEffect(() => {
    let toolHeight = 740; // Quest Tracker cutoff height
    if (tool === 'accountWide') toolHeight = 628;
    const greaterHeight = windowHeight > toolHeight;
    greaterHeight && tool ? setCollapsed(false) : setCollapsed(true);
  }, [windowHeight]);

  const handlePreferences = async () => {
    // Clear electron store when preference menu is opened after initial setup
    await window.electron.setExpansion('');
    await window.electron.setFaction('');
    setInstalled(false);
  }

  return (
    <div className={`tools ${expansion}-tools ${collapsed ? 'collapsed-menu' : ''}`}>
      <MainHeader collapsed={collapsed} headerText="Tools" setCollapsed={setCollapsed} />
      <ul className="tool-list">
        <Tool tool="accountWide" name={'Account-Wide'} />
        <Tool tool="questTracker" name="Quest Tracker" />
        <div className="tool-prefs">
          <MainButton handleClick={handlePreferences} buttonText="Preferences" />
        </div>
      </ul>
    </div>
  );
}

export default Tools;
