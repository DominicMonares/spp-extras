// Redux
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateFeature } from '../../store/slices/featureSlice';

//Types
import type { SelectedFeature } from '../../types/general';

// Styling
import './FeatureNav.css';


interface Props {
  feature: SelectedFeature,
  name: string
}

const Feature = ({ feature, name }: Props) => {
  const dispatch = useAppDispatch();
  const selFeature = useAppSelector(state => state.feature.selected);
  const featActive = (feat: SelectedFeature) => feat === selFeature ? 'active' : '';
  const featClassName = featActive(feature);

  const switchFeat = (feat: SelectedFeature): void => {
    dispatch(updateFeature(feat));
  }

  return (
    <>
      <div className={`feature ${featClassName}`} onClick={() => switchFeat(feature)}>
        {name}
      </div>
    </>
  );
}

export default Feature;
