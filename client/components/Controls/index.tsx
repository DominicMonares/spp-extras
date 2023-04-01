import MainHeader from '../MainHeader';
import QuestTrackerControls from './QuestTrackerControls';
import { useAppSelector } from '../../store/hooks';
import './Controls.css';


const Controls = () => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const tool = useAppSelector(state => state.tool.selected);

  return (
    <div className={`controls ${expansion}-controls`}>
      <MainHeader headerText="Controls" />
      {!tool ? (
        <div className="ctrl-label home-ctrl-label">No tool selected</div>
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
