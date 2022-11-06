import React from 'react';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateCharacters } from '../../store/slices/characterSlice';
import { getCharacters } from '../../apiCalls/characters';

import './QuestTracker.css';


const QuestTrackerControls = () => {
  const dispatch = useAppDispatch();
  const expansion = useAppSelector(state => state.expansion.selected);
  const characters = async () => await getCharacters(expansion);

  return (
    <div className='controls'>
      <button onClick={async () => dispatch(updateCharacters(await characters()))}>
        Get Characters
      </button>
      <button onClick={async () => dispatch(updateCharacters(await characters()))}>
        Get Quests
      </button>
    </div>
  );
}

export default QuestTrackerControls;
