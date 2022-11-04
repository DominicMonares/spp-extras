import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { updateExpansion } from '../store/slices/expansionSlice';
import { updateCharacters } from '../store/slices/characterSlice';
import './App.css';

function App() {
  // const [characters, setCharacters] = useState<any[]>([]);
  const expansion = useAppSelector(state => state.expansion);
  const characters = useAppSelector(state => state.characters);
  const dispatch = useAppDispatch();

  const testAPI = async () => {
    await fetch('http://127.0.0.1:8000/characters/all')
      .then(res => res.json())
      .then(data => dispatch(updateCharacters(data)))
      .catch(err => console.log('API ERROR: ', err));
  }

  const testExpacStore = () => {
    dispatch(updateExpansion('tbc'));
    console.log('STORE: ', expansion);
  }

  return (
    <div className="App">
      <div onClick={testAPI}>TEST API</div>
      <div onClick={testExpacStore}>TEST STORE</div>
      {Object.values(characters.horde).map((char) => char.name)}
      <div>{expansion.selected === 'vanilla' ? 'VANILLA' : 'TBC'}</div>
    </div>
  );
}

export default App;
