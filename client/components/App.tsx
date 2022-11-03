import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { updateExpansion } from '../store/slices/expansionSlice';
import './App.css';

function App() {
  const [characters, setCharacters] = useState<any[]>([]);
  const expansion = useAppSelector(state => state.expansion);
  const dispatch = useAppDispatch();

  const testAPI = async () => {
    await fetch('http://127.0.0.1:8000/characters/all')
      .then(res => res.json())
      .then(data => console.log('API RESPONSE: ', data))
      .catch(err => console.log('API ERROR: ', err));
  }

  const testStore = () => {
    dispatch(updateExpansion('tbc'));
    console.log('STORE: ', expansion);
  }

  return (
    <div className="App">
      <div onClick={testAPI}>TEST API</div>
      <div onClick={testStore}>TEST STORE</div>
      {characters.map((char) => char.name)}
      <div>{expansion.expansion === 'vanilla' ? 'VANILLA' : 'TBC'}</div>
    </div>
  );
}

export default App;
