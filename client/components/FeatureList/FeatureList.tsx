import React from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateFeature } from '../../store/slices/featureSlice';

import type { SelectedFeature } from '../..//store/types';

import './FeatureList.css';

const FeatureList = () => {
  const dispatch = useAppDispatch();
  const feature = useAppSelector(state => state.feature.selected);
  const featActive = (feat: SelectedFeature) => feat === feature ? 'active' : '';
  const feats = {
    quest_tracker: featActive('quest_tracker'),
    aw_achieves: featActive('aw_achieves')
  }

  const switchFeat = (feat: SelectedFeature): void => {
    dispatch(updateFeature(feat));
  }

  return (
    <div className='feature-list'>
      <div 
        className={`feature ${feats.quest_tracker}`} 
        onClick={() => switchFeat('quest_tracker')}
      >
        Quest Tracker
      </div>
      <div 
        className={`feature ${feats.aw_achieves}`} 
        onClick={() => switchFeat('aw_achieves')}
      >
        Account-wide Achievements
      </div>
    </div>
  );
}

export default FeatureList;
