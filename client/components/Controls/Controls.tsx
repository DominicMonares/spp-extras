import React from 'react';

import { url } from '../../config';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateCharacters } from '../../store/slices/characterSlice';

import './Controls.css';

const testAPI = async () => {
  const dispatch = useAppDispatch();
  const expansion = useAppSelector(state => state.expansion);
  const characters = useAppSelector(state => state.characters);
  const expansionParams = new URLSearchParams({ expansion: 'classic' });

  console.log('TEST ', `${url}/characters/all?` + expansionParams)
  await fetch(`${url}/characters/all?` + expansionParams)
    .then(res => res.json())
    .then(data => dispatch(updateCharacters(data)))
    .catch(err => console.log('API ERROR: ', err));
}

const Controls = () => {
  return (
    <div className='controls'>
      Controls
    </div>
  );
}

export default Controls;
