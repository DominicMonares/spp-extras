import { useState } from 'react';
import ExpansionPreferences from './ExpansionPreferences';
import FactionPreferences from './FactionPreferences';
import MainButton from '../MainButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { storeExpansion, storeFaction } from '../../store/slices';
import mainLogo from 'assets/logos/main-logo.webp';
import { ExpansionSetting, FactionSetting } from '../../../types';
import './Preferences.css';

interface Props {
  setInstalled: React.Dispatch<React.SetStateAction<boolean>>;
}

const Preferences = ({ setInstalled }: Props) => {
  const dispatch = useAppDispatch();
  const expansion = useAppSelector(state => state.expansion.selected);
  const faction = useAppSelector(state => state.faction.selected);

  // Track selected preferences
  const [selectedExpansion, setSelectedExpansion] = useState<ExpansionSetting>('');
  const [selectedFaction, setSelectedFaction] = useState<FactionSetting>('');

  // Prevent save button from being pressed when no expansion and/or faction selected
  const [noSelections, setNoSelections] = useState<boolean>(false);

  const save = async () => {
    if (!selectedExpansion || !selectedFaction) return setNoSelections(true);
    setNoSelections(false);

    // Send selected preferences to electron store so they persist
    await window.electron.setExpansion(selectedExpansion);
    await window.electron.setFaction(selectedFaction);

    // Send selected preferences to redux store for current session
    dispatch(storeExpansion(selectedExpansion));
    dispatch(storeFaction(selectedFaction));
    setInstalled(true);
  }

  const prefsSet = expansion || faction
  const prefsNotSet = !expansion || !faction

  return (
    <div className="preferences">
      <img className="main-logo" src={mainLogo} />
      <div className={`prefs-body ${prefsSet ? 'prefs-body-short' : ''}`}>
        <div className="prefs-text-body">
          {prefsNotSet ? (
            <div className="pref-text pref-text-top">Welcome to SPP Extras!</div>
          ) : (
            <></>
          )}
          <div className={`
            pref-text
            ${prefsSet ? 'pref-text-top' : ''}
          `}>
            Please select your preferred faction and expansion.
          </div>
          <div className="pref-text">
            These will be selected every time you open the app.
          </div>
          {prefsNotSet ? (
            <div className="pref-text">
              You can change your preferences any time from the Tools menu.
            </div>
          ) : (
            <></>
          )}
        </div>
        <ExpansionPreferences setSelectedExpansion={setSelectedExpansion} />
        <FactionPreferences setSelectedFaction={setSelectedFaction} />
        <div className="save-container">
          <MainButton
            handleClick={save}
            buttonText={`Save${prefsNotSet ? 'and Begin' : ''}`}
          />
          {noSelections ? (
            <div className="pref-text pref-text-save">
              Please select both an expansion and a faction to continue
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Preferences;
