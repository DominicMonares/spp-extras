import { useState } from 'react';
import vanillaLogo from '../../../../assets/logos/vanilla.png';
import tbcLogo from '../../../../assets/logos/tbc.png';
import wotlkLogo from '../../../../assets/logos/wotlk.png';
import { ExpansionPreferencesProps } from '../../../types';
import './Preferences.css';


const ExpansionPreferences = ({ setSelectedExpansion }: ExpansionPreferencesProps) => {
  // Keep currently selected expansion active
  const [vanillaActive, setVanillaActive] = useState<boolean>(false);
  const [tbcActive, setTbcActive] = useState<boolean>(false);
  const [wotlkActive, setWotlkActive] = useState<boolean>(false);

  // Keep hovering expansion active
  const [vanillaHovering, setVanillaHovering] = useState<boolean>(false);
  const [tbcHovering, setTbcHovering] = useState<boolean>(false);
  const [wotlkHovering, setWotlkHovering] = useState<boolean>(false);

  const handleVanilla = () => {
    setVanillaActive(true);
    setTbcActive(false);
    setWotlkActive(false);
    setSelectedExpansion('classic');
  }

  const handleTbc = () => {
    setVanillaActive(false);
    setTbcActive(true);
    setWotlkActive(false);
    setSelectedExpansion('tbc');
  }

  const handleWotlk = () => {
    setVanillaActive(false);
    setTbcActive(false);
    setWotlkActive(true);
    setSelectedExpansion('wotlk');
  }

  return (
    <div className="expansion-preferences">
      <div className="pref-container" onClick={handleVanilla}>
        <img
          className="pref vanilla-pref"
          src={vanillaLogo}
          onMouseEnter={() => setVanillaHovering(true)}
          onMouseLeave={() => setVanillaHovering(false)}
        />
        <img
          className={`
            pref-glow${vanillaActive || vanillaHovering ? '-active' : ''}
            vanilla-pref-glow
          `}
          src={vanillaLogo}
        />
      </div>
      <div className="pref-container" onClick={handleTbc}>
        <img
          className="pref tbc-pref"
          src={tbcLogo}
          onMouseEnter={() => setTbcHovering(true)}
          onMouseLeave={() => setTbcHovering(false)}
        />
        <img
          className={`
            pref-glow${tbcActive || tbcHovering ? '-active' : ''}
            tbc-pref-glow
          `}
          src={tbcLogo}
        />
      </div>
      <div className="pref-container" onClick={handleWotlk}>
        <img
          className="pref wotlk-pref"
          src={wotlkLogo}
          onMouseEnter={() => setWotlkHovering(true)}
          onMouseLeave={() => setWotlkHovering(false)}
        />
        <img
          className={`
            pref-glow${wotlkActive || wotlkHovering ? '-active' : ''}
            wotlk-pref-glow
          `}
          src={wotlkLogo}
        />
      </div>
    </div>
  );
}



export default ExpansionPreferences;
