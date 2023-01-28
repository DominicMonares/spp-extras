import Feature from './Feature';
import { useAppSelector } from '../../store/hooks';


const Features = () => {
  const expansion = useAppSelector(state => state.expansion.selected);

  return (
    <>
      <Feature feature="questTracker" name="Quest Tracker" />
      {expansion === 'wotlk' ? (
        <Feature feature="accountAchievements" name="Account-wide Achievements" />
      ) : (
        <></>
      )}
    </>
  );
}

export default Features;
