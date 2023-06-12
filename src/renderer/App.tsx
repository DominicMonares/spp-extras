import { useEffect, useState } from 'react';
import Controls from './components/Controls';
import ExpansionNav from './components/ExpansionNav';
import Preferences from './components/Preferences';
import Tools from './components/Tools';
import View from './components/View';
import { useAppDispatch, useAppSelector } from './store/hooks';
import {
  storeCharacters,
  storeCompletedQuests,
  storeExpansion,
  storeFaction,
  storeTemplateQuests,
  storeWindowHeight
} from './store/slices';
import { AllQTData, Expansion, ExpansionSetting } from 'types';
import './App.css';

const App = () => {
  const dispatch = useAppDispatch();
  const expansion = useAppSelector(state => state.expansion.selected);
  const faction = useAppSelector(state => state.faction.selected);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // Track whether user has completed initial setup or not
  const [installed, setInstalled] = useState<boolean>(false);

  // Fetch all data used in SPP Extras from DB
  const getQuestTrackerData = async (e?: unknown, xpac?: ExpansionSetting) => {
    if (!xpac) xpac = expansion as Expansion; // Used when switching expansions
    setLoading(true);
    setError('');
    let allData: AllQTData | Record<string,never> = {};
    try {
      allData = await window.electron.questTracker(xpac);
    } catch (err) {
      if (err && typeof err !== 'string') err = err.toString();
      let errMsg: string = '';
      if (err && typeof err === 'string') {
        // Remove boilerplate portion of err message
        errMsg = err.length > 52 ? err.slice(52) : err;
      }

      setLoading(false);
      setError(errMsg);
      return;
    }

    if (Object.keys(allData.characters).length) {
      dispatch(storeCharacters(allData.characters));
    }

    if (Object.keys(allData.completedQuests).length) {
      dispatch(storeCompletedQuests(allData.completedQuests));
    }

    if (Object.keys(allData.templateQuests).length) {
      dispatch(storeTemplateQuests(allData.templateQuests));
    }

    setLoading(false);
    setError('');
  }

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
        getQuestTrackerData(null, savedExpansion);
      }
    }

    checkPreferences();
  }, [installed]);

  useEffect(() => {
    if (expansion && faction) getQuestTrackerData();
  }, []);

  useEffect(() => {
    // Track window size and change class names accordingly
    const handleHeightChange = () => dispatch(storeWindowHeight(window.innerHeight));
    window.addEventListener('resize', handleHeightChange);
    return () => window.removeEventListener('resize', handleHeightChange);
  }, []);

  return (
    <div className={`app ${expansion || 'all'}-container`}>
      {installed ? (
        <>
          <ExpansionNav getAllData={getQuestTrackerData} />
          <div className="lower-app">
            <div>
              <Tools setInstalled={setInstalled} />
              <Controls />
            </div>
            <View error={error} getAllData={getQuestTrackerData} loading={loading} />
          </div>
        </>
      ) : (
        <Preferences setInstalled={setInstalled} />
      )}
    </div >
  );
}

export default App;
