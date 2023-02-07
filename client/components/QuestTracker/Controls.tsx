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
  const { character, characterClass, faction, race, zone } = settings;

  const filteredCharacterMenu = () => {
    const submenu = Object.values(characters[faction]).map(c => {
      const value = { characterClass: c.class_field, race: c.race };
      return { title: c.name, id: c.guid, value: JSON.stringify(value) };
    });

    submenu.unshift({
      title: 'All Characters',
      id: 0,
      value: '{ "characterClass": 0, "race": 0 }'
    });

    return [{ 
      title: 'All Characters', 
      submenu: submenu.filter(s => s.id !== character?.id) 
    }];
  }

  const filteredZoneMenu = () => {
    return [{
      title: zoneMenu[0]['title'],
      submenu: zoneMenu[0]['submenu'].map(w => {
        return {
          title: w.title,
          submenu: w.submenu.map(c => {
            return {
              title: c.title,
              submenu: c.submenu.filter(z => z.title !== zone)
            };
          })
        };
      })
    }];
  }

  const filteredClassMenu = () => {
    return [{
      title: classMenu[0]['title'],
      submenu: classMenu[0]['submenu'].filter(c => c.id !== characterClass?.id)
    }];
  }

  const filteredRaceMenu = () => {
    const raceMenuFaction = raceMenu[faction][0];

    return [{
      title: raceMenuFaction.title,
      submenu: raceMenuFaction.submenu.filter(r => r.id !== race?.id)
    }];
  }

  const currentCharacterClass = () => {
    const charClass = JSON.parse(character.value).characterClass;
    const classes = classMenu[0]['submenu'];
    for (const c of classes) if (c.id === charClass) return c;
  }

  const dispatchCharacterClass = () => {
    dispatch(storeQuestTrackerClass({
      characterClass: currentCharacterClass()
    }));
  }

  const currentCharacterRace = () => {
    const race = JSON.parse(character.value).race;
    const races = raceMenu[faction][0]['submenu'];
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
      <DropdownMenu type="character" menu={filteredCharacterMenu()} />
      <QuestTypeCheckboxes />
      <DropdownMenu type="zone" menu={filteredZoneMenu()} />
      {character && JSON.parse(character.value).characterClass ? (
        <button onClick={dispatchCharacterClass}>
          {currentCharacterClass()?.title}
        </button>
      ) : (
        <DropdownMenu type="class" menu={filteredClassMenu()} />
      )}
      {character && JSON.parse(character.value).race ? (
        <button onClick={dispatchCharacterRace}>
          {currentCharacterRace()?.title}
        </button>
      ) : (
        <DropdownMenu type="race" menu={filteredRaceMenu()} />
      )}
    </div>
  );
}

export default Controls;
