import QuestTrackerControls from './QuestTrackerControls';
import { useAppSelector } from '../../store/hooks';
import label from '../../assets/labels/small-label.png';


const Controls = () => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const smallWindow = useAppSelector(state => state.window.smallWindow);
  const size = smallWindow ? '-sm' : '';
  const tool = useAppSelector(state => state.tool.selected);

  return (
    <div className={`controls ${expansion}-controls ctrl${size}`}>
      <div className={`controls-header${size}`}>
        <img src={label} />
        <div className="controls-header-text">Controls</div>
      </div>
      {tool === 'questTracker' ? (
        <QuestTrackerControls />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Controls;
