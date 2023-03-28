import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { storeFaction } from '../../store/slices';
import alliance from '../../assets/buttons/alliance.png';
import horde from '../../assets/buttons/horde.png';
import { Faction } from "../../types";


const FactionSelect = () => {
  const dispatch = useAppDispatch();
  const faction = useAppSelector(state => state.faction.selected);
  const [animation, setAnimation] = useState<string>('');

  const selectFaction = (selectedFaction: Faction) => {
    const allianceSelected = selectedFaction === 'alliance' && faction !== 'alliance';
    const hordeSelected = selectedFaction === 'horde' && faction !== 'horde';
    if (allianceSelected) {
      setAnimation('-anim-1');
      dispatch(storeFaction(selectedFaction));
    } else if (hordeSelected) {
      setAnimation('-anim-2');
      dispatch(storeFaction(selectedFaction));
    }
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
