import React from 'react';

import ExpansionNav from './ExpansionNav/ExpansionNav';
import FeatureList from './FeatureList/FeatureList';
import Home from './Home/Home';
import QuestTracker from './QuestTracker/QuestTracker';
import AwAchieves from './AwAchieves/AwAchieves';
import { useAppSelector } from '../store/hooks';

import './App.css';

const App = () => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const feature = useAppSelector(state => state.feature.selected);

  return (
    <div className="app">
      <ExpansionNav />
      <div className="lower-app">
        <FeatureList />
        {!expansion || !feature ? <Home /> : <></>}
        {feature === 'quest_tracker' ? <QuestTracker /> : <></>}
        {feature === 'aw_achieves' ? <AwAchieves /> : <></>}
      </div>
    </div>
  );

}

export default App;
