import React from 'react';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateCharacters } from '../../store/slices/characterSlice';
import { updateCompletedQuests } from '../../store/slices/completedQuestSlice';
import { updateAllQuests } from '../../store/slices/allQuestSlice';

import { getCharacters } from '../../apiCalls/characters';
import { getCompletedQuests, getAllQuests } from '../../apiCalls/quests';

import type { SelectedExpansion, Character, CompletedQuests } from "../../store/types";

import { faction } from '../../helpers/characters';

import './QuestTracker.css';


const QuestTrackerControls = () => {
  const dispatch = useAppDispatch();
  const expansion = useAppSelector(state => state.expansion.selected);
  const characters = useAppSelector(state => state.characters);
  const completedQuests = useAppSelector(state => state.completedQuests);
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
      <button onClick={async () => await storeQuests()}>
        Get Quests
      </button>
    </div>
  );
}

export default QuestTrackerControls;
