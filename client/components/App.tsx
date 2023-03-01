import AccountWideAchievements from './AccountWideAchievements';
import ExpansionNav from './ExpansionNav';
import Tools from './Tools';
import Home from './Home';
import QuestTracker from './QuestTracker';
import { useAppSelector } from '../store/hooks';
import './App.css';


const App = () => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const feature = useAppSelector(state => state.feature.selected);

  return (
    <div className={`app ${expansion}-container`}>
      <ExpansionNav />
      <div className="lower-app">
        <Tools />
        {!expansion || !feature ? <Home /> : <></>}
        {feature === 'questTracker' ? <QuestTracker /> : <></>}
        {feature === 'accountAchievements' ? <AccountWideAchievements /> : <></>}
      </div>
    </div>
  );

}

export default App;
