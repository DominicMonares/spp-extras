import { useAppSelector } from '../../store/hooks';
import Tool from './Tool';
import WoWButton from '../WoWButton';
import label from '../../assets/labels/small-label.png';
import { ToolsProps } from '../../types';
import './Tools.css';


const Tools = ({ setInstalled }: ToolsProps) => {
  const expansion = useAppSelector(state => state.expansion.selected);

  const handlePreferences = async () => {
    await window.electron.setExpansion('');
    await window.electron.setFaction('');
    setInstalled(false);
  }

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
        <WoWButton handleClick={handlePreferences} buttonText="Preferences" />
      </ul>
    </div>
  );
}

export default Tools;
