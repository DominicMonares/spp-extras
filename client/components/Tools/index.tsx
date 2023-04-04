import { useState } from 'react';
import MainButton from '../MainButton';
import MainHeader from '../MainHeader';
import Tool from './Tool';
import { useAppSelector } from '../../store/hooks';
import { ToolsProps } from '../../types';
import './Tools.css';


const Tools = ({ setInstalled }: ToolsProps) => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const handlePreferences = async () => {
    // Clear electron store when preference menu is opened after initial setup
    await window.electron.setExpansion('');
    await window.electron.setFaction('');
    setInstalled(false);
  }

  return (
    <div className={`tools ${expansion}-tools`}>
      <MainHeader collapsed={collapsed} headerText="Tools" setCollapsed={setCollapsed} />
      <ul className="tool-list">
        <Tool tool="questTracker" name="Quest Tracker" />
        {expansion === 'wotlk' ? (
          <Tool tool="accountAchievements" name={'Account-wide Achievements'} />
        ) : (
          <></>
        )}
        <MainButton handleClick={handlePreferences} buttonText="Preferences" />
      </ul>
    </div>
  );
}

export default Tools;
