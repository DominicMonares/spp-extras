import DropdownMenu from '../DropdownMenu';
import FactionCheckboxes from './FactionCheckboxes';
import QuestTypeCheckboxes from './QuestTypeCheckboxes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { storeQuestTrackerClass, storeQuestTrackerRace } from '../../store/slices';
import { QuestTrackerControlsProps } from '../../types';
import classMenu from '../../../data/classMenu.json';
import raceMenu from '../../../data/raceMenu.json';
import zoneMenu from '../../../data/zoneMenu.json';
import './QuestTracker.css';


const Controls = ({ characters }: QuestTrackerControlsProps) => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(state => state.questTracker);
  const { faction, character } = settings;

  const characterMenu = () => {
    const submenu = Object.values(characters[faction]).map(c => {
      const value = { characterClass: c.class_field, race: c.race };
      return { title: c.name, id: c.guid, value: JSON.stringify(value) };
    });

    submenu.unshift({ 
      title: 'All Characters', 
      id: 0, 
      value: '{ "characterClass": 1, "race": 1 }'
    });

    return [{ title: 'All Characters', submenu: submenu }];
  }

  const characterClass = () => {
    const charClass = JSON.parse(character.value).characterClass;
    const classes = classMenu[0]['submenu'];
    for (const c of classes) if (c.id === charClass) return c;
  }

  const dispatchCharacterClass = () => {
    dispatch(storeQuestTrackerClass({
      characterClass: characterClass()
    }));
  }

  const characterRace = () => {
    const race = JSON.parse(character.value).race;
    const races = raceMenu[faction][0]['submenu'];
    for (const r of races) if (r.id === race) return r;
  }

  const dispatchCharacterRace = () => {
    dispatch(storeQuestTrackerRace({
      race: characterRace()
    }));
  }

  return (
    <div className="controls">
      <FactionCheckboxes />
      <DropdownMenu type="character" menu={characterMenu()} />
      <QuestTypeCheckboxes />
      <DropdownMenu type="zone" menu={zoneMenu} />
      {character ? (
        <button onClick={dispatchCharacterClass}>
          {characterClass().title}
        </button>
      ) : (
        <DropdownMenu type="class" menu={classMenu} />
      )}
      {character ? (
        <button onClick={dispatchCharacterRace}>
          {characterRace().title}
        </button>
      ) : (
        <DropdownMenu type="race" menu={raceMenu[faction]} />
      )}
    </div>
  );
}

export default Controls;
