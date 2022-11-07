import React from 'react';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateCharacters } from '../../store/slices/characterSlice';
import { getCharacters } from '../../apiCalls/characters';
import { getQuests } from '../../apiCalls/quests';
import type { SelectedExpansion, Character } from "../../store/types";

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
    const alliance = Object.values(chars.alliance).map((c: Character) => c.guid);
    const horde = Object.values(chars.horde).map((c: Character) => c.guid);
    const charIds = alliance.concat(horde).join(',');
    console.log('ASDFASDF ', charIds)
    await getQuests(expansion, charIds);
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
