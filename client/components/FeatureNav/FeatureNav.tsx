// Redux
import { useAppSelector } from '../../store/hooks';

// Components
import Features from './Features';

// Styling
import './FeatureNav.css';


const FeatureList = () => {
  const expansion = useAppSelector(state => state.expansion.selected);

  return (
    <div className='feature-list'>
      Features:
      {expansion ? <Features /> : <></>}
    </div>
  );
}

export default FeatureList;
