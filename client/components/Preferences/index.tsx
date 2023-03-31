import { useState } from 'react';
import ExpansionPreferences from './ExpansionPreferences';
import FactionPreferences from './FactionPreferences';
import MainButton from '../MainButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import mainLogo from '../../assets/logos/main.png';
import './Preferences.css';
import { Expansion, Faction, PreferencesProps } from '../../types';
import { storeExpansion, storeFaction } from '../../store/slices';


const Preferences = ({ setInstalled }: PreferencesProps) => {
  const dispatch = useAppDispatch();
  const expansion = useAppSelector(state => state.expansion.selected);
  const faction = useAppSelector(state => state.faction.selected);
  const [selectedExpansion, setSelectedExpansion] = useState<Expansion>('');
  const [selectedFaction, setSelectedFaction] = useState<Faction>('');
  const [noSelections, setNoSelections] = useState<boolean>(false);

  const save = async () => {
    if (!selectedExpansion || !selectedFaction) return setNoSelections(true);
    setNoSelections(false);
    await window.electron.setExpansion(selectedExpansion);
    await window.electron.setFaction(selectedFaction);
    dispatch(storeExpansion(selectedExpansion));
    dispatch(storeFaction(selectedFaction));
    setInstalled(true);
  }

  return (
    <div className="preferences">
      <img className="main-logo" src={mainLogo} />
      <div className="prefs-body">
        <div className="prefs-text-body">
          {!expansion || !faction ? (
            <div className="pref-text welcome">Welcome to SPP Extras!</div>
          ) : (
            <></>
          )}
          <div className="pref-text">
            Please select your preferred faction and expansion.
          </div>
          <div className="pref-text">
            These will be selected every time you open the app.
          </div>
          <div className="pref-text">
            You can change your preferences any time from the Tools menu.
          </div>
        </div>
        <ExpansionPreferences setSelectedExpansion={setSelectedExpansion} />
        <FactionPreferences setSelectedFaction={setSelectedFaction} />
        <div className="save-container">
          <MainButton handleClick={save} buttonText="Save and Begin" />
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
