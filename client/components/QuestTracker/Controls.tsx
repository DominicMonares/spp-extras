// React
import { useEffect } from 'react';

// Redux
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateCharacters } from '../../store/slices/characterSlice';
import { updateCompletedQuests } from '../../store/slices/completedQuestSlice';
import { updateTemplateQuests } from '../../store/slices/templateQuestSlice';

// Components
import FactionCheckboxes from './FactionCheckboxes';
import TypeCheckboxes from './TypeCheckboxes';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

// API Calls
import { getCharacters } from '../../apiCalls/characters';
import { getCompletedQuests, getTemplateQuests } from '../../apiCalls/quests';

// Types
import type { Character } from "../../types/characters";

// Helpers
import { getFaction } from '../../helpers/characters';

// Data
import zoneMenu from '../../../data/zoneMenu.json';

// Styling
import './QuestTracker.css';


const QuestTrackerControls = () => {
  const dispatch = useAppDispatch();
  const expansion = useAppSelector(state => state.expansion.selected);
  const characters = useAppSelector(state => state.characters);
  const templateQuests = useAppSelector(state => state.templateQuests);
  const settings = useAppSelector(state => state.questTracker);
  const faction = settings.faction;

  useEffect(() => {
    // Fetch template quests and completed quests if they aren't in store
    const handleStorage = async () => await storeQuests();
    if (faction && !templateQuests[faction].length) handleStorage();
  });

  const storeQuests = async () => {
    // Fetch all characters if they aren't in store
    const allianceCharsExist = Object.keys(characters.alliance).length;
    const hordeCharsExist = Object.keys(characters.horde).length;
    const charsExist = allianceCharsExist || hordeCharsExist;
    const chars = !charsExist ? await handleCharacters() : characters;

    // Fetch all template quests if they aren't in store
    const templateQuestsExist = Object.keys(templateQuests.alliance).length;
    if (!templateQuestsExist) await handleTemplateQuests();

    // Fetch all completed quests
    const allianceChars = Object.values(chars.alliance);
    const allianceParams = allianceChars.map((c: Character) => [c.guid, getFaction(c.race)]);
    const hordeChars = Object.values(chars.horde);
    const hordeParams = hordeChars.map((c: Character) => [c.guid, getFaction(c.race)]);
    const charParams = allianceParams.concat(hordeParams).flat().join(',');
    const allCompletedQuests = await getCompletedQuests(expansion, charParams);
    dispatch(updateCompletedQuests(allCompletedQuests));
  }

  const handleCharacters = async () => {
    const chars = await getCharacters(expansion);
    dispatch(updateCharacters(chars));
    return chars;
  }

  const handleTemplateQuests = async () => {
    const quests = await getTemplateQuests(expansion);
    dispatch(updateTemplateQuests(quests));
  }

  return (
    <div className='controls'>
      <FactionCheckboxes />
      {faction ? (
        <>
          <TypeCheckboxes />
          <DropdownMenu type='zone' menu={zoneMenu} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default QuestTrackerControls;
