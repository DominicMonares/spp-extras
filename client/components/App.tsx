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
import { getFaction, windowIsSmall } from '../utils';
import { Character, Characters, Expansion } from '../types';
import './App.css';


const App = () => {
  const dispatch = useAppDispatch();
  const tool = useAppSelector(state => state.tool.selected);
  const expansion = useAppSelector(state => state.expansion.selected);
  const faction = useAppSelector(state => state.faction.selected);
  const smallWindow = useAppSelector(state => state.window.smallWindow);
  const [installed, setInstalled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const checkPreferences = async () => {
      const savedExpansion = await window.electron.getExpansion();
      if (savedExpansion) dispatch(storeExpansion(savedExpansion));
      const savedFaction = await window.electron.getFaction();
      if (savedFaction) dispatch(storeFaction(savedFaction));
      if (savedExpansion && savedFaction) {
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
    const handleWidthChange = () => dispatch(storeWindowWidth(windowIsSmall()));
    window.addEventListener('resize', handleWidthChange);
    return () => window.removeEventListener('resize', handleWidthChange);
  }, []);

  const getCharacters = async (xpac: Expansion) => {
    const newCharacters = await fetchCharacters(xpac).catch(err => setError(err.message));
    if (newCharacters) {
      dispatch(storeCharacters(newCharacters));
      return newCharacters;
    } else {
      return;
    }
  }

  const getCompletedQuests = async (chars: Characters, xpac: Expansion) => {
    const allianceCharacters = Object.values(chars.alliance);
    const allianceParameters = allianceCharacters.map((c: Character) => [c.guid, getFaction(c.race)]);
    const hordeCharacters = Object.values(chars.horde);
    const hordeParameters = hordeCharacters.map((c: Character) => [c.guid, getFaction(c.race)]);
    const characterParameters = allianceParameters.concat(hordeParameters).flat().join(',');
    const newCompletedQuests = await fetchCompletedQuests(xpac, characterParameters)
      .catch(err => setError(err));
    if (newCompletedQuests) {
      dispatch(storeCompletedQuests(newCompletedQuests));
      return newCompletedQuests;
    } else {
      return;
    }
  }

  const getTemplateQuests = async (xpac: Expansion) => {
    const newTemplateQuests = await fetchTemplateQuests(xpac).catch(err => setError(err));
    if (newTemplateQuests) {
      dispatch(storeTemplateQuests(newTemplateQuests))
      return newTemplateQuests;
    } else {
      return;
    }
  }

  const getAllData = async (xpac?: Expansion) => {
    if (!xpac) xpac = expansion;
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
          <ExpansionNav updateStore={getAllData} />
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
