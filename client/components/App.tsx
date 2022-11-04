import React from 'react';

import ExpansionNav from './ExpansionNav/ExpansionNav';
import FeatureList from './FeatureList/FeatureList';
import MainView from './MainView/MainView';
import Controls from './Controls/Controls';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <ExpansionNav />
      <div className="lower-app">
        <FeatureList />
        <MainView />
        <Controls />
      </div>
    </div>
  );
}

export default App;
