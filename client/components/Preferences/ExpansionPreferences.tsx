import { useState } from 'react';
import vanillaLogo from '../../assets/logos/vanilla.png';
import vanillaLogoGlow from '../../assets/logos/vanilla-glow.png';
import tbcLogo from '../../assets/logos/tbc.png';
import tbcLogoGlow from '../../assets/logos/tbc-glow.png';
import wotlkLogo from '../../assets/logos/wotlk.png';
import wotlkLogoGlow from '../../assets/logos/wotlk-glow.png';
import './Preferences.css';


const ExpansionPreferences = () => {
  const [vanillaActive, setVanillaActive] = useState<boolean>(false);
  const [tbcActive, setTbcActive] = useState<boolean>(false);
  const [wotlkActive, setWotlkActive] = useState<boolean>(false);
  
  const handleVanilla = () => {
    setVanillaActive(true);
    setTbcActive(false);
    setWotlkActive(false);
  }

  const handleTbc = () => {
    setVanillaActive(false);
    setTbcActive(true);
    setWotlkActive(false);
  }

  const handleWotlk = () => {
    setVanillaActive(false);
    setTbcActive(false);
    setWotlkActive(true);
  }

  return (
    <div className="preferences-expansions">
      <div className="preferences-vanilla-container" onClick={handleVanilla}>
        <img className="preferences-vanilla" src={vanillaLogo} />
        {vanillaActive ? (
          <img className="preferences-vanilla-active" src={vanillaLogoGlow} />
        ) : (
          <></>
        )}
      </div>
      <div className="preferences-tbc-container" onClick={handleTbc}>
        <img className="preferences-tbc" src={tbcLogo} />
        {tbcActive ? (
          <img className="preferences-tbc-active" src={tbcLogoGlow} />
        ) : (
          <></>
        )}
      </div>
      <div className="preferences-wotlk-container" onClick={handleWotlk}>
        <img className="preferences-wotlk" src={wotlkLogo} />
        {wotlkActive ? (
          <img className="preferences-wotlk-active" src={wotlkLogoGlow} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ExpansionPreferences;
