import React, { useState } from 'react';

import { useAppDispatch } from '../../store/hooks';
import { updateQTFaction } from '../../store/slices/questTrackerSlice';

import type { QuestTrackerFaction } from "../../types/quests";

const FactionCheckboxes = () => {
  const dispatch = useAppDispatch();
  const [checks, setChecks] = useState([true, false, false]);

  const selectFaction = (checkboxes: boolean[], qtFaction: QuestTrackerFaction) => {
    setChecks(checkboxes);
    dispatch(updateQTFaction({ faction: qtFaction }));
  }

  return (
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
  );
}

export default FactionCheckboxes;
