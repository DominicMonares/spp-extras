import React from 'react';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateCharacters } from '../../store/slices/characterSlice';
import { getCharacters } from '../../apiCalls/characters';
import { getQuests } from '../../apiCalls/quests';
import type { SelectedExpansion, Character } from "../../store/types";

import { faction } from '../../helpers/characters';

import './QuestTracker.css';


const QuestTrackerControls = () => {
  const dispatch = useAppDispatch();
  const expansion = useAppSelector(state => state.expansion.selected);
  const characters = useAppSelector(state => state.characters);
  
  const storeCharacters = async ()  => {
    const chars = await getCharacters(expansion);
    dispatch(updateCharacters(chars));
    return chars;
  }

  const storeQuests = async () => {
    const chars = await storeCharacters();
    const allianceChars = Object.values(chars.alliance);
    const allianceQuery = allianceChars.map((c: Character) => [c.guid, faction(c.race)]);
    const hordeChars = Object.values(chars.horde);
    const hordeQuery = hordeChars.map((c: Character) => [c.guid, faction(c.race)]);
    const charQuery = allianceQuery.concat(hordeQuery).flat().join(',');
    const completedQuests = await getQuests(expansion, charQuery);
    console.log('COMPLETED QUESTS: ', completedQuests)
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
