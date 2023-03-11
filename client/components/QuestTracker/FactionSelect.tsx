import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { storeQuestTrackerFaction } from '../../store/slices';
import alliance from '../../assets/buttons/alliance.png';
import horde from '../../assets/buttons/horde.png';
import { Faction } from "../../types";


const FactionSelect = () => {
  const dispatch = useAppDispatch();
  const faction = useAppSelector(state => state.questTracker.faction);
  const [animation, setAnimation] = useState<string>('');

  const selectFaction = (selectedFaction: Faction) => {
    // const allianceAnimation = animation === '' || animation === '-anim-2';
    const allianceSelected = selectedFaction === 'alliance' && faction !== 'alliance';
    // const allianceMatch = allianceAnimation && allianceSelected;
    // const hordeAnimation = animation === '' || animation === '-anim-1';
    const hordeSelected = selectedFaction === 'horde' && faction !== 'horde';
    // const hordeMatch = hordeAnimation && hordeSelected;
    if (allianceSelected) {
      setAnimation('-anim-1');
    } else if (hordeSelected) {
      setAnimation('-anim-2');
    }

    dispatch(storeQuestTrackerFaction({ faction: selectedFaction }));
  }

  return (
    <div className="faction-select">
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
