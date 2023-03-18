import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { storeQuestTrackerFaction } from '../../store/slices';
import alliance from '../../assets/buttons/alliance.png';
import horde from '../../assets/buttons/horde.png';
import { Faction } from "../../types";


const FactionSelect = () => {
  const dispatch = useAppDispatch();
  const faction = useAppSelector(state => state.questTracker.faction);
  const smallWindow = useAppSelector(state => state.window.smallWindow);
  const size = smallWindow ? '-sm' : '';
  const [animation, setAnimation] = useState<string>('');

  const selectFaction = (selectedFaction: Faction) => {
    const allianceSelected = selectedFaction === 'alliance' && faction !== 'alliance';
    const hordeSelected = selectedFaction === 'horde' && faction !== 'horde';
    if (allianceSelected) {
      setAnimation('-anim-1');
      dispatch(storeQuestTrackerFaction({ faction: selectedFaction }));
    } else if (hordeSelected) {
      setAnimation('-anim-2');
      dispatch(storeQuestTrackerFaction({ faction: selectedFaction }));
    }
  }

  return (
    <div className={`faction-select${size}`}>
      {faction === 'alliance' ? (
        <>
          <img
            className={`qt-alliance-1${animation}`}
            src={alliance}
            onClick={() => selectFaction('alliance')}
          />
          <img
            className={`qt-horde-1${animation}`}
            src={horde}
            onClick={() => selectFaction('horde')}
          />
        </>
      ) : (
        <>
          <img
            className={`qt-horde-2${animation}`}
            src={horde}
            onClick={() => selectFaction('horde')}
          />
          <img
            className={`qt-alliance-2${animation}`}
            src={alliance}
            onClick={() => selectFaction('alliance')}
          />
        </>
      )}

    </div>
  );
}

export default FactionSelect;
