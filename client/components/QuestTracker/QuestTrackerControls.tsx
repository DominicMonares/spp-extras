import React from 'react';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateCharacters } from '../../store/slices/characterSlice';
import { getCharacters } from '../../apiCalls/characters';
import { getQuests } from '../../apiCalls/quests';
import type { SelectedExpansion } from "../../store/types";

import './QuestTracker.css';


const QuestTrackerControls = () => {
  const dispatch = useAppDispatch();
  const expansion = useAppSelector(state => state.expansion.selected);
  const characters = useAppSelector(state => state.characters);
  
  const storeCharacters = async () => {
    dispatch(updateCharacters(await getCharacters(expansion)))
  }

  const storeQuests = async () => {
    await storeCharacters();
    const alliance = Object.values(characters.alliance).map(c => c.guid);
    const horde = Object.values(characters.horde).map(c => c.guid);
    const charIds = alliance.concat(horde).join(',');
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
