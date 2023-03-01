import { useAppSelector } from '../../store/hooks';
import Tool from './Tool';
import label from '../../assets/labels/small-label.png';
import './Tools.css';


const Tools = () => {
  const expansion = useAppSelector(state => state.expansion.selected);

  return (
    <div className="tool-list">
      <img src={label} />
      <Tool tool="questTracker" name="Quest Tracker" />
      {expansion === 'wotlk' ? (
        <Tool tool="accountAchievements" name="Account-wide Achievements" />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Tools;
