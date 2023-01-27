import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { storeFeature } from '../../store/slices';
import { FeatureNavProps, SelectedFeature } from '../../types';
import './FeatureNav.css';


const Feature = ({ feature, name }: FeatureNavProps) => {
  const dispatch = useAppDispatch();
  const selectedFeature = useAppSelector(state => state.feature.selected);

  const switchFeature = (feat: SelectedFeature): void => {
    dispatch(storeFeature(feat));
  }

  return (
    <>
      <div
        className={`feature ${feature === selectedFeature ? 'active' : ''}`}
        onClick={() => switchFeature(feature)}
      >
        {name}
      </div>
    </>
  );
}

export default Feature;
