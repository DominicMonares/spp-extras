import { useAppSelector } from '../../store/hooks';
import MainButton from '../MainButton';
import MainHeader from '../MainHeader';
import Tool from './Tool';
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
      <MainHeader headerText="Tools" />
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
