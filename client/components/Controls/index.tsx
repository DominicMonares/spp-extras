import QuestTrackerControls from './QuestTrackerControls';
import { useAppSelector } from '../../store/hooks';


const Controls = () => {
  const tool = useAppSelector(state => state.tool.selected);

  return (
    <div>
      {tool === 'questTracker' ? (
        <QuestTrackerControls />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Controls;
