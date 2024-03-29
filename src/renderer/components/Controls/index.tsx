import { useState } from 'react';
import AccountWideControls from './AccountWideControls';
import MainHeader from '../MainHeader';
import QuestTrackerControls from './QuestTrackerControls';
import { useAppSelector } from 'renderer/store/hooks';
import './Controls.css';

const Controls = () => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const tool = useAppSelector(state => state.tool.selected);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <div className={`controls ${expansion}-controls ${collapsed ? 'collapsed-menu' : ''}`}>
      <MainHeader collapsed={collapsed} headerText="Controls" setCollapsed={setCollapsed} />
      {!tool ? (
        <div className="ctrl-label ctrl-not-sel">No tool selected</div>
      ) : (
        <></>
      )}
      {tool === 'accountWide' ? (
        <AccountWideControls />
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
