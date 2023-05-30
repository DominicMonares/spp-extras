import { useState } from 'react';
import alliance from '../../../../assets/buttons/alliance.png';
import horde from '../../../../assets/buttons/horde.png';
import { FactionSetting } from '../../../types';
import './Preferences.css';

interface Props {
  setSelectedFaction: React.Dispatch<React.SetStateAction<FactionSetting>>;
}

const FactionPreferences = ({ setSelectedFaction }: Props) => {
  // Keep currently selected faction active
  const [allianceActive, setAllianceActive] = useState<string>('');
  const [hordeActive, setHordeActive] = useState<string>('');

  const handleAlliance = () => {
    setAllianceActive('-active');
    setHordeActive('');
    setSelectedFaction('alliance');
  }

  const handleHorde = () => {
    setAllianceActive('');
    setHordeActive('-active');
    setSelectedFaction('horde');
  }

  return (
    <div className="faction-preferences">
      <img
        className={`alliance-pref${allianceActive}`}
        src={alliance}
        onClick={handleAlliance}
      />
      <img
        className={`horde-pref${hordeActive}`}
        src={horde}
        onClick={handleHorde}
      />
    </div>
  );
}

export default FactionPreferences;
