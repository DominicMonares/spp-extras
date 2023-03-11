import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { storeQuestTrackerFaction } from '../../store/slices';
import alliance from '../../assets/buttons/alliance.png';
import horde from '../../assets/buttons/horde.png';
import { Faction } from "../../types";


const FactionSelect = () => {
  const dispatch = useAppDispatch();
  const [animation, setAnimation] = useState<string>('');

  const selectFaction = (faction: Faction) => {
    faction === 'horde' ? setAnimation('-anim-1') : setAnimation('-anim-2');
    dispatch(storeQuestTrackerFaction({ faction: faction }));
  }

  return (
    <div className="faction-select">
      <img 
        className={`qt-alliance${animation}`}
        src={alliance}
        onClick={() => selectFaction('alliance')}
      />
      <img 
        className={`qt-horde${animation}`}
        src={horde}
        onClick={() => selectFaction('horde')}
      />
    </div>
  );
}

export default FactionSelect;
