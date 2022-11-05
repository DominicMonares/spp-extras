import React from 'react';

import { useAppSelector } from '../../store/hooks';

const MainView = () => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const feature = useAppSelector(state => state.feature.selected);



  return (
    <div className='main-view'>
      {!expansion && !feature ? <div>Please select an expansion</div> : <></>}
      {expansion && !feature ? <div>Please select a feature</div> : <></>}
      {expansion && feature ? <div>Render feature component here</div> : <></>}
    </div>
  );
}

export default MainView;
