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
  const [vanillaHovering, setVanillaHovering] = useState<boolean>(false);
  const [tbcHovering, setTbcHovering] = useState<boolean>(false);
  const [wotlkHovering, setWotlkHovering] = useState<boolean>(false);
  
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
    <div className="expansion-preferences">
      <div 
        className="vanilla-pref-container" 
        onClick={handleVanilla}
        onMouseEnter={() => setVanillaHovering(true)}
        onMouseLeave={() => setVanillaHovering(false)}
      >
        <img className="vanilla-pref" src={vanillaLogo} />
        {vanillaActive || vanillaHovering ? (
          <img className="vanilla-pref-glow" src={vanillaLogoGlow} />
        ) : (
          <></>
        )}
      </div>
      <div 
        className="tbc-pref-container" 
        onClick={handleTbc}
        onMouseEnter={() => setTbcHovering(true)}
        onMouseLeave={() => setTbcHovering(false)}
      >
        <img className="tbc-pref" src={tbcLogo} />
        {tbcActive || tbcHovering ? (
          <img className="tbc-pref-glow" src={tbcLogoGlow} />
        ) : (
          <></>
        )}
      </div>
      <div 
        className="wotlk-pref-container" 
        onClick={handleWotlk}
        onMouseEnter={() => setWotlkHovering(true)}
        onMouseLeave={() => setWotlkHovering(false)}
      >
        <img className="wotlk-pref" src={wotlkLogo} />
        {wotlkActive || wotlkHovering ? (
          <img className="wotlk-pref-glow" src={wotlkLogoGlow} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ExpansionPreferences;
