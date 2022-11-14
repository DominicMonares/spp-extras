// Redux
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateCharacters } from '../../store/slices/characterSlice';
import { updateCompletedQuests } from '../../store/slices/completedQuestSlice';
import { updateAllQuests } from '../../store/slices/allQuestSlice';

// Components
import FactionCheckboxes from './FactionCheckboxes';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

// API Calls
import { getCharacters } from '../../apiCalls/characters';
import { getCompletedQuests, getAllQuests } from '../../apiCalls/quests';

// Types
import type { Character } from "../../types/characters";

// Helpers
import { faction } from '../../helpers/characters';

// Data
import zoneMenu from '../../../data/zoneMenu.json';

// Styling
import './QuestTracker.css';


const QuestTrackerControls = () => {
  const dispatch = useAppDispatch();
  const expansion = useAppSelector(state => state.expansion.selected);
  const characters = useAppSelector(state => state.characters);
  const allQuests = useAppSelector(state => state.allQuests);
  
  const storeCharacters = async ()  => {
    const chars = await getCharacters(expansion);
    dispatch(updateCharacters(chars));
    return chars;
  }

  const storeAllQuests = async () => {
    const quests = await getAllQuests(expansion);
    dispatch(updateAllQuests(quests));
  }

  const storeQuests = async () => {
    const allianceCharsExist = Object.keys(characters.alliance).length;
    const hordeCharsExist = Object.keys(characters.horde).length;
    const charsExist = allianceCharsExist || hordeCharsExist;
    const chars = !charsExist ? await storeCharacters() : characters;

    const allQuestsExist = Object.keys(allQuests.alliance).length;
    !allQuestsExist ? await storeAllQuests() : allQuests;

    const allianceChars = Object.values(chars.alliance);
    const allianceParams = allianceChars.map((c: Character) => [c.guid, faction(c.race)]);
    const hordeChars = Object.values(chars.horde);
    const hordeParams = hordeChars.map((c: Character) => [c.guid, faction(c.race)]);
    const charParams = allianceParams.concat(hordeParams).flat().join(',');
    const allCompletedQuests = await getCompletedQuests(expansion, charParams);
    dispatch(updateCompletedQuests(allCompletedQuests));
  }

  return (
    <div className='controls'>
      <FactionCheckboxes />
      <DropdownMenu menu={zoneMenu} />
      <button onClick={async () => await storeQuests()}>
        Get Quests
      </button>
    </div>
  );
}

export default QuestTrackerControls;
