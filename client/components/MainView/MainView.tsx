import React from 'react';

import { url } from '../../config';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateExpansion } from '../../store/slices/expansionSlice';
import { updateCharacters } from '../../store/slices/characterSlice';

const MainView = () => {
  const dispatch = useAppDispatch();
  const expansion = useAppSelector(state => state.expansion);
  const characters = useAppSelector(state => state.characters);

  const testAPI = async () => {
    const expansionParams = new URLSearchParams({ expansion: 'classic' });
    console.log('TEST ', `${url}/characters/all?` + expansionParams)
    await fetch(`${url}/characters/all?` + expansionParams)
      .then(res => res.json())
      .then(data => dispatch(updateCharacters(data)))
      .catch(err => console.log('API ERROR: ', err));
  }

  const testExpacStore = () => {
    dispatch(updateExpansion('tbc'));
    console.log('STORE: ', expansion);
  }

  return (
    <div className='main-view'>
      MAIN VIEW
    </div>
  );
}

export default MainView;
