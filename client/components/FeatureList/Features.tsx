import React from 'react';

import Feature from './Feature';
import { useAppSelector } from '../../store/hooks';

const Features = () => {
  const expansion = useAppSelector(state => state.expansion.selected);
 
  return (
    <>
      <Feature feature="quest_tracker" name="Quest Tracker"/>
      {expansion === 'wotlk' 
        ? <Feature feature="aw_achieves" name="Account-wide Achievements" /> 
        : <></>
      }
    </>
  );
}

export default Features;
