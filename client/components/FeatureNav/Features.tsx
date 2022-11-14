// Redux
import { useAppSelector } from '../../store/hooks';

// Components
import Feature from './Feature';


const Features = () => {
  const expansion = useAppSelector(state => state.expansion.selected);

  return (
    <>
      <Feature feature='quest_tracker' name='Quest Tracker' />
      {expansion === 'wotlk' ? (
        <Feature feature='aw_achieves' name='Account-wide Achievements' />
      ) : (
        <></>
      )}
    </>
  );
}

export default Features;
