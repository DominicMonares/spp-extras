import React from 'react';

import { useAppSelector } from '../../store/hooks';
import Features from './Features';

import './FeatureList.css';

const FeatureList = () => {
  const expansion = useAppSelector(state => state.expansion.selected);

  return (
    <div className='feature-list'>
      {expansion ? <Features /> : <></>}
    </div>
  );
}

export default FeatureList;
