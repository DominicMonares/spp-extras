import Tool from './Tool';
import { useAppSelector } from '../../store/hooks';


const Tools = () => {
  const expansion = useAppSelector(state => state.expansion.selected);

  return (
    <>
      <Tool tool="questTracker" name="Quest Tracker" />
      {expansion === 'wotlk' ? (
        <Tool tool="accountAchievements" name="Account-wide Achievements" />
      ) : (
        <></>
      )}
    </>
  );
}

export default Tools;
