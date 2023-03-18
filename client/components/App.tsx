import { useEffect, useState } from 'react';
// import AccountWideAchievements from './AccountWideAchievements';
import Controls from './Controls';
import ExpansionNav from './ExpansionNav';
import Home from './Home';
import Tools from './Tools';
import View from './View';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  storeCharacters,
  storeCompletedQuests,
  storeTemplateQuests
} from '../store/slices';
import {
  fetchCharacters,
  fetchCompletedQuests,
  fetchTemplateQuests
} from '../apiCalls';
import { getFaction } from '../utils';
import { Character, Characters } from '../types';
import './App.css';



const App = () => {
  const dispatch = useAppDispatch();
  const tool = useAppSelector(state => state.tool.selected);
  const expansion = useAppSelector(state => state.expansion.selected);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const isSmall = () =>  window.innerWidth < 900 ? true : false;
  const [smallWindow, setSmallWindow] = useState<boolean>(isSmall());

  useEffect(() => {
    storeQuestsAndCharacters();
  }, []);

  useEffect(() => {
    const handleWidthChange = () => setSmallWindow(isSmall());
    window.addEventListener('resize', handleWidthChange);
    return () => window.removeEventListener('resize', handleWidthChange);
  }, []);

  const getCharacters = async () => {
    const newCharacters = await fetchCharacters(expansion).catch(err => setError(err.message));
    if (newCharacters) {
      dispatch(storeCharacters(newCharacters));
      return newCharacters;
    } else {
      return;
    }
  }

  const getCompletedQuests = async (chars: Characters) => {
    const allianceCharacters = Object.values(chars.alliance);
    const allianceParameters = allianceCharacters.map((c: Character) => [c.guid, getFaction(c.race)]);
    const hordeCharacters = Object.values(chars.horde);
    const hordeParameters = hordeCharacters.map((c: Character) => [c.guid, getFaction(c.race)]);
    const characterParameters = allianceParameters.concat(hordeParameters).flat().join(',');
    const newCompletedQuests = await fetchCompletedQuests(expansion, characterParameters)
      .catch(err => setError(err));
    if (newCompletedQuests) {
      dispatch(storeCompletedQuests(newCompletedQuests));
      return newCompletedQuests;
    } else {
      return;
    }
  }

  const getTemplateQuests = async () => {
    const newTemplateQuests = await fetchTemplateQuests(expansion).catch(err => setError(err));
    if (newTemplateQuests) {
      dispatch(storeTemplateQuests(newTemplateQuests))
      return newTemplateQuests;
    } else {
      return;
    }
  }

  const storeQuestsAndCharacters = async () => {
    setLoading(true);
    setError('');
    const chars = await getCharacters();
    if (!chars) return setLoading(false);
    const completed = await getCompletedQuests(chars);
    if (!completed) return setLoading(false);
    const template = await getTemplateQuests();
    if (!template) return setLoading(false);
    setLoading(false);
    setError('');
  }

  return (
    <div className={`app ${expansion}-container`}>
      <ExpansionNav />
      <div className="lower-app">
        {!expansion || !tool ? <Home /> : <></>}

        {smallWindow ? (
          <></>
        ) : (
          <>
            <Tools />
            {tool === 'questTracker' ? (
              <>
                <View error={error} loading={loading} retry={storeQuestsAndCharacters} />
                <Controls />
              </>
            ) : (
              <></>
            )}
          </>
        )}


        {tool === 'accountAchievements' ? (
          <div>
            <View />
            <Controls />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div >
  );

}

export default App;
