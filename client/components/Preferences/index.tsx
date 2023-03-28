import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import mainLogo from '../../assets/logos/main.png';
import alliance from '../../assets/buttons/alliance.png';
import horde from '../../assets/buttons/horde.png';
import './Preferences.css';


const Preferences = () => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const faction = useAppSelector(state => state.faction.selected);
  const [active, setActive] = useState<string>('');

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
          <img className={`preferences-alliance${active}`} src={alliance} />
          <img className={`preferences-horde${active}`} src={horde} />
        </div>
      </div>
      <button
        onClick={() => {
          window.electron.setExpansion('classic')
            .then((res: any) => console.log('SET ', res))
            .catch((e: any) => {
              console.log('ERROR ', e)
            })
        }}
      >
        SET
      </button>
      <button
        onClick={() => {
          window.electron.getExpansion()
            .then((res: any) => console.log('ASSHOLE ', res))
            .catch((e: any) => {
              console.log('ERROR ', e)
            })
        }}
      >
        GET
      </button>
    </div>
  );
}

export default Preferences;
