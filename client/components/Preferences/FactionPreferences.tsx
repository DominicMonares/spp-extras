import { useState } from 'react';
import alliance from '../../assets/buttons/alliance.png';
import horde from '../../assets/buttons/horde.png';
import './Preferences.css';


const FactionPreferences = () => {
  const [allianceActive, setAllianceActive] = useState<string>('');
  const [hordeActive, setHordeActive] = useState<string>('');

  const handleAlliance = () => {
    setAllianceActive('-active');
    setHordeActive('');
  }

  const handleHorde = () => {
    setAllianceActive('');
    setHordeActive('-active');
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
