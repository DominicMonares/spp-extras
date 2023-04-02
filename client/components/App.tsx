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
import {
  fetchCharacters,
  fetchCompletedQuests,
  fetchTemplateQuests
} from '../apiCalls';
import { checkFaction, windowIsSmall } from '../utils';
import { Character, Characters, Expansion } from '../types';
import './App.css';


const App = () => {
  const dispatch = useAppDispatch();
  const tool = useAppSelector(state => state.tool.selected);
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
        getAllData(savedExpansion);
      }
    }

    checkPreferences();
  }, [installed])

  useEffect(() => {
    if (expansion && faction) getAllData();
  }, []);

  useEffect(() => {
    // Track window size and change class names accordingly
    const handleWidthChange = () => dispatch(storeWindowWidth(windowIsSmall()));
    window.addEventListener('resize', handleWidthChange);
    return () => window.removeEventListener('resize', handleWidthChange);
  }, []);

  // Fetch all characters from DB then add to redux store
  const getCharacters = async (xpac: Expansion) => {
    const newCharacters = await fetchCharacters(xpac).catch(err => setError(err.message));
    if (newCharacters) {
      dispatch(storeCharacters(newCharacters));
      return newCharacters;
    } else {
      return;
    }
  }

  // Fetch all completed quests using character data then add to redux store
  const getCompletedQuests = async (chars: Characters, xpac: Expansion) => {
    // Create query parameters using character data from both factions
    const allianceChars = Object.values(chars.alliance);
    const allianceParams = allianceChars.map((c: Character) => [c.guid, checkFaction(c.race)]);
    const hordeChars = Object.values(chars.horde);
    const hordeParams = hordeChars.map((c: Character) => [c.guid, checkFaction(c.race)]);
    const characterParams = allianceParams.concat(hordeParams).flat().join(',');

    // Fetch completed quests using newly created query parameters
    const newCompletedQuests = await fetchCompletedQuests(xpac, characterParams)
      .catch(err => setError(err));

    if (newCompletedQuests) {
      dispatch(storeCompletedQuests(newCompletedQuests));
      return newCompletedQuests;
    } else {
      return;
    }
  }

  // Fetch all template quests from DB
  const getTemplateQuests = async (xpac: Expansion) => {
    const newTemplateQuests = await fetchTemplateQuests(xpac).catch(err => setError(err));
    if (newTemplateQuests) {
      dispatch(storeTemplateQuests(newTemplateQuests))
      return newTemplateQuests;
    } else {
      return;
    }
  }

  // Fetch all data used in SPP-Extras from DB
  const getAllData = async (xpac?: Expansion) => {
    if (!xpac) xpac = expansion; // Used when switching expansions
    setLoading(true);
    setError('');
    const chars = await getCharacters(xpac);
    if (!chars) return setLoading(false);
    const completedQuests = await getCompletedQuests(chars, xpac);
    if (!completedQuests) return setLoading(false);
    const templateQuests = await getTemplateQuests(xpac);
    if (!templateQuests) return setLoading(false);
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
                {!tool ? (
                  <View error={error} loading={loading} retry={getAllData} />
                ) : (
                  <></>
                )}
                {tool === 'questTracker' ? (
                  <View error={error} loading={loading} retry={getAllData} />
                ) : (
                  <></>
                )}
                {tool === 'accountAchievements' ? (
                  <View error={error} loading={loading} retry={getAllData} />
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                <Tools setInstalled={setInstalled} />
                {!tool ? (
                  <View error={error} loading={loading} retry={getAllData} />
                ) : (
                  <></>
                )}
                {tool === 'questTracker' ? (
                  <View error={error} loading={loading} retry={getAllData} />
                ) : (
                  <></>
                )}
                {tool === 'accountAchievements' ? (
                  <View error={error} loading={loading} retry={getAllData} />
                ) : (
                  <></>
                )}
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
