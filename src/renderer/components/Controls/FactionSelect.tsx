import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  storeFaction,
  storeQuestTrackerCharacter,
  storeQuestTrackerClass,
  storeQuestTrackerRace
} from '../../store/slices';
import alliance from 'assets/buttons/alliance-button.webp';
import horde from 'assets/buttons/horde-button.webp';
import { Faction } from 'types';


const FactionSelect = () => {
  const dispatch = useAppDispatch();
  const faction = useAppSelector(state => state.faction.selected);
  const settings = useAppSelector(state => state.questTracker);
  // Switch animation depending on currently selected faction
  const [animation, setAnimation] = useState<string>('');

  // Clear character, class, and race settings when faction changes
  const clearSettings = () => {
    dispatch(storeQuestTrackerCharacter({ id: 0, name: '', value: '' }));
    dispatch(storeQuestTrackerClass({ id: 0, title: '', value: 0 }));
    dispatch(storeQuestTrackerRace({ id: 0, title: '', value: 0 }));
  }

  // Change animation and send selected faction to store
  const selectFaction = (selectedFaction: Faction) => {
    const allianceSelected = selectedFaction === 'alliance' && faction !== 'alliance';
    const hordeSelected = selectedFaction === 'horde' && faction !== 'horde';
    if (allianceSelected) {
      setAnimation('-anim-1');
      dispatch(storeFaction(selectedFaction));
      if (!settings.zone) clearSettings();
    } else if (hordeSelected) {
      setAnimation('-anim-2');
      dispatch(storeFaction(selectedFaction));
      if (!settings.zone) clearSettings();
    }
  }

  return (
    <div className="faction-select">
      {faction === 'alliance' ? (
        <div className="faction-select-container">
          <img
            className={`faction-btn qt-alliance-1${animation}`}
            src={alliance}
            onClick={() => selectFaction('alliance')}
          />
          <img
            className={`faction-btn qt-horde-1${animation}`}
            src={horde}
            onClick={() => selectFaction('horde')}
          />
        </div>
      ) : (
        <div className="faction-select-container">
          <img
            className={`faction-btn qt-horde-2${animation}`}
            src={horde}
            onClick={() => selectFaction('horde')}
          />
          <img
            className={`faction-btn qt-alliance-2${animation}`}
            src={alliance}
            onClick={() => selectFaction('alliance')}
          />
        </div>
      )}

    </div>
  );
}

export default FactionSelect;
