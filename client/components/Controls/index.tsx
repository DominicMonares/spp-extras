import { useState } from 'react';
import AccountwideControls from './AccountwideControls';
import MainHeader from '../MainHeader';
import QuestTrackerControls from './QuestTrackerControls';
import { useAppSelector } from '../../store/hooks';
import './Controls.css';


const Controls = () => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const tool = useAppSelector(state => state.tool.selected);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <div className={`controls ${expansion}-controls ${collapsed ? 'collapsed-menu' : ''}`}>
      <MainHeader collapsed={collapsed} headerText="Controls" setCollapsed={setCollapsed} />
      {!tool ? (
        <div className="ctrl-label home-ctrl-label">No tool selected</div>
      ) : (
        <></>
      )}
      {tool === 'acctAchievements' ? (
        <AccountwideControls />
      ) : (
        <></>
      )}
      {tool === 'questTracker' ? (
        <QuestTrackerControls />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Controls;
