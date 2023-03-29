import ExpansionPreferences from './ExpansionPreferences';
import FactionPreferences from './FactionPreferences';
import { useAppSelector } from '../../store/hooks';
import mainLogo from '../../assets/logos/main.png';
import './Preferences.css';


const Preferences = () => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const faction = useAppSelector(state => state.faction.selected);

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
        <FactionPreferences />
        <ExpansionPreferences />
      </div>
    </div>
  );
}

export default Preferences;
