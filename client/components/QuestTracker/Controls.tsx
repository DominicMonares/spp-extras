import DropdownMenu from '../DropdownMenu';
import FactionCheckboxes from './FactionCheckboxes';
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
import { QuestTrackerControlsProps } from '../../types';
import './QuestTracker.css';


const Controls = ({ characters }: QuestTrackerControlsProps) => {
  const dispatch = useAppDispatch();
  const expansion = useAppSelector(state => state.expansion.selected);
  const settings = useAppSelector(state => state.questTracker);
  const { character, characterClass, faction, race, type, zone } = settings;

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
    <div className="quest-tracker-controls">
      <FactionCheckboxes />
      <DropdownMenu type="zone" menu={zoneMenu(expansion, zone)} />
      {character && JSON.parse(character.value).characterClass ? (
        <button onClick={dispatchCharacterClass}>
          {getClass(character)?.title}
        </button>
      ) : (
        <DropdownMenu type="class" menu={classMenu(expansion, faction, characterClass)} />
      )}
      {character && JSON.parse(character.value).race ? (
        <button onClick={dispatchCharacterRace}>
          {getRace(character, faction)?.title}
        </button>
      ) : (
        <DropdownMenu type="race" menu={raceMenu(expansion, faction, race)} />
      )}
      Additional Filters
      <DropdownMenu type="character" menu={characterMenu(character, characters, faction)} />
      <DropdownMenu type="type" menu={questTypeMenu(expansion, type)} />
    </div>
  );
}

export default Controls;
