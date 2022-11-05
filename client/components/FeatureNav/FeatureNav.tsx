import React from 'react';

import { useAppSelector } from '../../store/hooks';
import Features from './Features';

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
