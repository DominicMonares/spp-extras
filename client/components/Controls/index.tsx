import QuestTrackerControls from './QuestTrackerControls';
import { useAppSelector } from '../../store/hooks';
import label from '../../assets/labels/small-label.png';
import './Controls.css';


const Controls = () => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const tool = useAppSelector(state => state.tool.selected);

  return (
    <div className={`controls ${expansion}-controls`}>
      <div className="controls-header">
        <img src={label} />
        <div className="controls-header-text">Controls</div>
      </div>
      {!tool ? (
        <div className="control-label home-ctrl-label">No tool selected</div>
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
