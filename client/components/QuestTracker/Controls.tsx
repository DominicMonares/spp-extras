import React, { useState } from 'react';

// Store
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateCharacters } from '../../store/slices/characterSlice';
import { updateCompletedQuests } from '../../store/slices/completedQuestSlice';
import { updateAllQuests } from '../../store/slices/allQuestSlice';
import {
  updateQTFaction
} from '../../store/slices/questTrackerSlice';

// API Calls
import { getCharacters } from '../../apiCalls/characters';
import { getCompletedQuests, getAllQuests } from '../../apiCalls/quests';

// Types
import type { Character, QuestTrackerFaction } from "../../store/types";

// Helpers
import { faction } from '../../helpers/characters';

// Styling
import './QuestTracker.css';


const QuestTrackerControls = () => {
  const dispatch = useAppDispatch();
  const expansion = useAppSelector(state => state.expansion.selected);
  const characters = useAppSelector(state => state.characters);
  const allQuests = useAppSelector(state => state.allQuests);
  const [checks, setChecks] = useState([true, false, false]);
  
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

  const selectFaction = (checkboxes: boolean[], qtFaction: QuestTrackerFaction) => {
    setChecks(checkboxes);
    dispatch(updateQTFaction({ faction: qtFaction }));
  }

  return (
    <div className='controls'>
      <div>
        <label>
          <input
            type='checkbox'
            checked={checks[0]}
            onChange={() => selectFaction([true, false, false], 'alliance')}
          />
          Alliance
        </label>
        <label>
          <input
            type='checkbox'
            checked={checks[1]}
            onChange={() => selectFaction([false, true, false], 'horde')}
          />
          Horde
        </label>
        <label>
          <input
            type='checkbox'
            checked={checks[2]}
            onChange={() => selectFaction([false, false, true], 'both')}
          />
          Both
        </label>
      </div>
      <button onClick={async () => await storeQuests()}>
        Get Quests
      </button>
    </div>
  );
}

export default QuestTrackerControls;
