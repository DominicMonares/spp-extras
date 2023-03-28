import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import alliance from '../../assets/buttons/alliance.png';
import horde from '../../assets/buttons/horde.png';
import mainLogo from '../../assets/logos/main.png';
import vanillaLogo from '../../assets/logos/vanilla.png';
import vanillaLogoGlow from '../../assets/logos/vanilla-glow.png';
import tbcLogo from '../../assets/logos/tbc.png';
import tbcLogoGlow from '../../assets/logos/tbc-glow.png';
import wotlkLogo from '../../assets/logos/wotlk.png';
import wotlkLogoGlow from '../../assets/logos/wotlk-glow.png';
import './Preferences.css';


const Preferences = () => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const faction = useAppSelector(state => state.faction.selected);
  const [allianceActive, setAllianceActive] = useState<string>('');
  const [hordeActive, setHordeActive] = useState<string>('');
  const [vanillaActive, setVanillaActive] = useState<boolean>(false);
  const [tbcActive, setTbcActive] = useState<boolean>(false);
  const [wotlkActive, setWotlkActive] = useState<boolean>(false);

  const handleAlliance = () => {
    setAllianceActive('-active');
    setHordeActive('');
  }

  const handleHorde = () => {
    setAllianceActive('');
    setHordeActive('-active');
  }

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
    <div className="preferences">
      <img className="main-logo" src={mainLogo} />
      <div className="preferences-body">
        <div className="preferences-text-body">
          {!expansion || !faction ? (
            <div className="preferences-text welcome">Welcome to SPP Extras!</div>
          ) : (
            <></>
          )}
          <div className="preferences-text">
            Please select your preferred faction and expansion.
          </div>
          <div className="preferences-text">
            These will be selected every time you open the app.
          </div>
          <div className="preferences-text">
            You can change your preferences any time from the Tools menu.
          </div>
        </div>
        <div className="preferences-factions">
          <img 
            className={`preferences-alliance${allianceActive}`} 
            src={alliance} 
            onClick={handleAlliance}
          />
          <img 
            className={`preferences-horde${hordeActive}`} 
            src={horde} 
            onClick={handleHorde}
          />
        </div>
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
      </div>
    </div>
  );
}

export default Preferences;
