import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import Controls from './Controls';
import View from './View';
import {
  fetchCharacters,
  fetchCompletedQuests,
  fetchTemplateQuests
} from '../../apiCalls';
import { getFaction } from '../../utils/characters';
import {
  Character,
  Characters,
  CompletedQuests,
  TemplateQuests
} from '../../types';


const defaultCharsAndCompleted = {
  alliance: {},
  horde: {}
};

const defaultTemplateQuests = {
  alliance: {},
  horde: {},
  both: {}
};

const QuestTracker = () => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const [templateQuests, setTemplateQuests] = useState<TemplateQuests>(defaultTemplateQuests);
  const [characters, setCharacters] = useState<Characters>(defaultCharsAndCompleted);
  const [completedQuests, setCompletedQuests] = useState<CompletedQuests>(defaultCharsAndCompleted);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    storeQuestsAndCharacters();
  }, []);

  const getCharacters = async () => {
    const newCharacters = await fetchCharacters(expansion).catch(err => setError(err.message));
    if (newCharacters) {
      setCharacters(newCharacters);
      return newCharacters;
    }
  }

  const getCompletedQuests = async (chars: Characters) => {
    const allianceCharacters = Object.values(chars.alliance);
    const allianceParameters = allianceCharacters.map((c: Character) => [c.guid, getFaction(c.race)]);
    const hordeCharacters = Object.values(chars.horde);
    const hordeParameters = hordeCharacters.map((c: Character) => [c.guid, getFaction(c.race)]);
    const characterParameters = allianceParameters.concat(hordeParameters).flat().join(',');
    const allCompletedQuests = await fetchCompletedQuests(expansion, characterParameters)
      .catch(err => setError(err));
    if (allCompletedQuests) setCompletedQuests(allCompletedQuests);
  }

  const getTemplateQuests = async () => {
    const newTemplateQuests = await fetchTemplateQuests(expansion).catch(err => setError(err));
    if (newTemplateQuests) setTemplateQuests(newTemplateQuests);
  }

  const storeQuestsAndCharacters = async () => {
    const chars = await getCharacters();
    await getCompletedQuests(chars);
    await getTemplateQuests();
  }

  return (
    <>
      <View 
        templateQuests={templateQuests} 
        completedQuests={completedQuests} 
        error={error}
      />
      <Controls characters={characters} />
    </>
  );
}

export default QuestTracker;
