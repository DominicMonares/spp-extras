import AccountWideAchievements from './AccountWideAchievements';
import ExpansionNav from './ExpansionNav';
import FeatureList from './FeatureNav';
import Home from './Home';
import QuestTracker from './QuestTracker';
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
        {feature === 'questTracker' ? <QuestTracker /> : <></>}
        {feature === 'accountAchievements' ? <AccountWideAchievements /> : <></>}
      </div>
    </div>
  );

}

export default App;
