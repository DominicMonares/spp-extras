import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { storeQuestTrackerFaction } from '../../store/slices';
import alliance from '../../assets/buttons/alliance.png';
import horde from '../../assets/buttons/horde.png';
import { Faction } from "../../types";


const FactionSelect = () => {
  const dispatch = useAppDispatch();
  const [checks, setChecks] = useState([true, false]);

  const selectFaction = (checkboxes: boolean[], faction: Faction) => {
    setChecks(checkboxes);
    dispatch(storeQuestTrackerFaction({ faction: faction }));
  }

  return (
    <div>
      <img 
        src={alliance}
        onClick={() => selectFaction([true, false], 'alliance')}
      />
      <img 
        src={horde}
        onChange={() => selectFaction([false, true], 'horde')}
      />
    </div>
  );
}

export default FactionSelect;
