import { useEffect, useState } from 'react';
// import AccountWideAchievements from './AccountWideAchievements';
import Controls from './Controls';
import ExpansionNav from './ExpansionNav';
import Preferences from './Preferences';
import Tools from './Tools';
import View from './View';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  storeCharacters,
  storeCompletedQuests,
  storeExpansion,
  storeFaction,
  storeTemplateQuests,
  storeWindowWidth
} from '../store/slices';
import { fetchAllData } from '../apiCalls';
import { windowIsSmall } from '../utils';
import { Expansion } from '../types';
import './App.css';


const App = () => {
  const dispatch = useAppDispatch();
  const expansion = useAppSelector(state => state.expansion.selected);
  const faction = useAppSelector(state => state.faction.selected);
  const smallWindow = useAppSelector(state => state.window.smallWindow);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // Track whether user has completed initial setup or not
  const [installed, setInstalled] = useState<boolean>(false);

  useEffect(() => {
    // Transfer data from electron store to redux store if it exists
    const checkPreferences = async () => {
      const savedExpansion = await window.electron.getExpansion();
      if (savedExpansion) dispatch(storeExpansion(savedExpansion));
      const savedFaction = await window.electron.getFaction();
      if (savedFaction) dispatch(storeFaction(savedFaction));
      if (savedExpansion && savedFaction) {
        // Close preferences and fetch data once settings have been transferred/confirmed
        setInstalled(true);
        getAllData(null, savedExpansion);
      }
    }

    checkPreferences();
  }, [installed])

  useEffect(() => {
    if (expansion && faction) getAllData();
  }, []);

  useEffect(() => {
    // Track window size and change class names accordingly
    const handleWidthChange = () => dispatch(storeWindowWidth(windowIsSmall(window.innerWidth)));
    window.addEventListener('resize', handleWidthChange);
    return () => window.removeEventListener('resize', handleWidthChange);
  }, []);

  // Fetch all data used in SPP Extras from DB
  const getAllData = async (e?: any, xpac?: Expansion) => {
    if (!xpac) xpac = expansion; // Used when switching expansions
    setLoading(true);
    setError('');

    const allData = await fetchAllData(xpac).catch(err => setError(err.message));
    if (allData) {
      dispatch(storeCharacters(allData.characters));
      dispatch(storeCompletedQuests(allData.completed_quests));
      dispatch(storeTemplateQuests(allData.template_quests));
    } else {
      setLoading(false);
      return;
    }

    setLoading(false);
    setError('');
  }

  return (
    <div className={`app ${expansion || 'all'}-container`}>
      {installed ? (
        <>
          <ExpansionNav getAllData={getAllData} />
          <div className="lower-app">
            {smallWindow ? (
              <>
                <div>
                  <Tools setInstalled={setInstalled} />
                  <Controls />
                </div>
                <View error={error} getAllData={getAllData} loading={loading} />
              </>
            ) : (
              <>
                <Tools setInstalled={setInstalled} />
                <View error={error} getAllData={getAllData} loading={loading} />
                <Controls />
              </>
            )}
          </div>
        </>
      ) : (
        <Preferences setInstalled={setInstalled} />
      )}
    </div >
  );

}

export default App;
