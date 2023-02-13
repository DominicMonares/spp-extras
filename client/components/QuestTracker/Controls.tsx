import DropdownMenu from '../DropdownMenu';
import FactionCheckboxes from './FactionCheckboxes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { storeQuestTrackerClass, storeQuestTrackerRace } from '../../store/slices';
import {
  characterMenu,
  classMenu,
  questTypeMenu,
  raceMenu,
  zoneMenu
} from '../../utils';
import { QuestTrackerControlsProps } from '../../types';
import _classMenu from '../../../data/classMenu.json';
import _raceMenu from '../../../data/raceMenu.json';
import './QuestTracker.css';


const Controls = ({ characters }: QuestTrackerControlsProps) => {
  const dispatch = useAppDispatch();
  const expansion = useAppSelector(state => state.expansion.selected);
  const settings = useAppSelector(state => state.questTracker);
  const { character, characterClass, faction, race, type, zone } = settings;

  const currentCharacterClass = () => {
    const charClass = JSON.parse(character.value).characterClass;
    const classes = _classMenu[0]['submenu'];
    for (const c of classes) if (c.id === charClass) return c;
  }

  const dispatchCharacterClass = () => {
    dispatch(storeQuestTrackerClass({
      characterClass: currentCharacterClass()
    }));
  }

  const currentCharacterRace = () => {
    const race = JSON.parse(character.value).race;
    const races = _raceMenu[faction][0]['submenu'];
    for (const r of races) if (r.id === race) return r;
  }

  const dispatchCharacterRace = () => {
    dispatch(storeQuestTrackerRace({
      race: currentCharacterRace()
    }));
  }

  return (
    <div className="controls">
      <FactionCheckboxes />
      <DropdownMenu type="zone" menu={zoneMenu(expansion, zone)} />
      {character && JSON.parse(character.value).characterClass ? (
        <button onClick={dispatchCharacterClass}>
          {currentCharacterClass()?.title}
        </button>
      ) : (
        <DropdownMenu type="class" menu={classMenu(expansion, faction, characterClass)} />
      )}
      {character && JSON.parse(character.value).race ? (
        <button onClick={dispatchCharacterRace}>
          {currentCharacterRace()?.title}
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
