import DropdownMenu from '../DropdownMenu';
import FactionSelect from './FactionSelect';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { storeQuestTrackerClass, storeQuestTrackerRace } from '../../store/slices';
import {
  characterMenu,
  classMenu,
  getClass,
  getRace,
  questTypeMenu,
  raceMenu,
  zoneMenu
} from '../../utils';
import './Controls.css';


const QuestTrackerControls = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(state => state.characters)
  const expansion = useAppSelector(state => state.expansion.selected);
  const settings = useAppSelector(state => state.questTracker);
  const { character, characterClass, faction, race, type, zone } = settings;
  const smallWindow = useAppSelector(state => state.window.smallWindow);
  const size = smallWindow ? '-sm' : '';

  const dispatchCharacterClass = () => {
    dispatch(storeQuestTrackerClass({
      characterClass: getClass(character)
    }));
  }

  const dispatchCharacterRace = () => {
    dispatch(storeQuestTrackerRace({
      race: getRace(character, faction)
    }));
  }

  return (
    <>
      <div className={`qt-faction${size}`}>
        <div className={`control-label${size}`}>Select Faction:</div>
        <FactionSelect />
      </div>
      <div className={`qt-filters${size}`}>
        <div className={`control-label${size} filter-zone${size}`}>Select Zone:</div>
        <DropdownMenu dropdownType="zone" menu={zoneMenu(expansion, zone)} />
        <div className={`control-label${size} filter-or${size}`}>~ or ~</div>
        {character && JSON.parse(character.value).characterClass ? (
          <button onClick={dispatchCharacterClass}>
            {getClass(character)?.title}
          </button>
        ) : (
          <DropdownMenu 
            dropdownType="class" 
            menu={classMenu(expansion, faction, characterClass)} 
          />
        )}
        {character && JSON.parse(character.value).race ? (
          <button onClick={dispatchCharacterRace}>
            {getRace(character, faction)?.title}
          </button>
        ) : (
          <DropdownMenu dropdownType="race" menu={raceMenu(expansion, faction, race)} />
        )}
      </div>
      <div className={`qt-additional-filters${size}`}>
        <div className={`control-label${size} filter-additional${size}`}>Additional Filters:</div>
        <DropdownMenu 
          dropdownType="character" 
          menu={characterMenu(character, characters, faction)} 
        />
        <DropdownMenu dropdownType="type" menu={questTypeMenu(expansion, type)} />
      </div>
    </>
  );
}

export default QuestTrackerControls;
