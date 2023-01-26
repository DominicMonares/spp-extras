import Features from './Features';
import { useAppSelector } from '../../store/hooks';
import './FeatureNav.css';


const FeatureList = () => {
  const expansion = useAppSelector(state => state.expansion.selected);

  return (
    <div className="feature-list">
      Features:
      {expansion ? <Features /> : <></>}
    </div>
  );
}

export default FeatureList;
