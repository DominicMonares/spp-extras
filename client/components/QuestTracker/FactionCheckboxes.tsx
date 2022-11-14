// React
import { useState } from 'react';

// Redux
import { useAppDispatch } from '../../store/hooks';
import { updateQTFaction } from '../../store/slices/questTrackerSlice';

// Types
import type { QuestTrackerFaction } from "../../types/quests";


const FactionCheckboxes = () => {
  const dispatch = useAppDispatch();
  const [checks, setChecks] = useState([false, false]);

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
          onChange={() => selectFaction([true, false], 'alliance')}
        />
        Alliance
      </label>
      <label>
        <input
          type='checkbox'
          checked={checks[1]}
          onChange={() => selectFaction([false, true], 'horde')}
        />
        Horde
      </label>
    </div>
  );
}

export default FactionCheckboxes;
