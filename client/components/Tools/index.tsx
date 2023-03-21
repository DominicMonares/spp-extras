import { useAppSelector } from '../../store/hooks';
import Tool from './Tool';
import label from '../../assets/labels/small-label.png';
import './Tools.css';


const Tools = () => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const smallWindow = useAppSelector(state => state.window.smallWindow);
  const size = smallWindow ? '-sm' : '';

  return (
    <div className={`tools ${expansion}-tools`}>
      <div className="tools-header">
        <img src={label} />
        <div className="tools-header-text">Tools</div>
      </div>
      <ul className="tool-list">
        <Tool tool="questTracker" name="Quest Tracker" />
        {expansion === 'wotlk' ? (
          <Tool tool="accountAchievements" name={'Account-wide Achievements'} />
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}

export default Tools;
