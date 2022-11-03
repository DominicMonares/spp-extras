import React, { useState } from 'react';

import './App.css';

function App() {
  const [characters, setCharacters] = useState<any[]>([]);

  const testAPI = async () => {
    await fetch('http://127.0.0.1:8000/characters/all')
      .then(res => res.json())
      .then(data => console.log('API RESPONSE: ', setCharacters(data)))
      .catch(err => console.log('API ERROR: ', err));
  }

  return (
    <div className="App">
      <div onClick={testAPI}>TEST API</div>
      {characters.map((char) => char.name)}
    </div>
  );
}

export default App;
