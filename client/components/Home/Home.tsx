import React from 'react';

import { useAppSelector } from '../../store/hooks';

const Home = () => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const feature = useAppSelector(state => state.feature.selected);

  return (
    <div className='home'>
      {!expansion && !feature ? <div>Please select an expansion</div> : <></>}
      {expansion && !feature ? <div>Please select a feature</div> : <></>}
    </div>
  );
}

export default Home;
