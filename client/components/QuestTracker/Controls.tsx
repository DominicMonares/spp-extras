import DropdownMenu from '../DropdownMenu';
import FactionCheckboxes from './FactionCheckboxes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { storeQuestTrackerClass, storeQuestTrackerRace } from '../../store/slices';
import { QuestTrackerControlsProps } from '../../types';
import classMenu from '../../../data/classMenu.json';
import questTypeMenu from '../../../data/questTypeMenu.json';
import raceMenu from '../../../data/raceMenu.json';
import zoneMenu from '../../../data/zoneMenu.json';
import './QuestTracker.css';


const Controls = ({ characters }: QuestTrackerControlsProps) => {
  const dispatch = useAppDispatch();
  const expansion = useAppSelector(state => state.expansion.selected);
  const settings = useAppSelector(state => state.questTracker);
  const { character, characterClass, faction, race, type, zone } = settings;

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

  const filteredQuestTypeMenu = () => {
    return [{
      title: questTypeMenu[0]['title'],
      submenu: questTypeMenu[0]['submenu'].filter(t => {
        const nonVanillaType = t.title === 'Daily' || t.title === 'Monthly';
        if (nonVanillaType && expansion === 'classic') return false;

        const noTypeMatch = t.title.toLowerCase() !== type;
        const noTypeSelected = !type && t.title === 'All Quest Types';
        return noTypeMatch && noTypeSelected ? false : noTypeMatch;
      })
    }];
  }

  const filteredZoneMenu = () => {
    const menu = [{
      title: zoneMenu[0]['title'],
      submenu: zoneMenu[0]['submenu'].map(w => {
        return {
          title: w.title,
          submenu: w.submenu?.map(c => {
            return {
              title: c.title,
              submenu: c.submenu.filter(z => {
                const eversong = z.title === 'Eversong Woods';
                const ghostlands = z.title === 'Ghostlands';
                const isle = z.title === 'Isle of Quel\'Danas';
                const silvermoon = z.title === 'Silvermoon City';
                const azuremyst = z.title === 'Azuremyst Isle';
                const bloodmyst = z.title === 'Bloodmyst Isle';
                const exodar = z.title === 'The Exodar';
                const easternKingdoms = eversong || ghostlands || isle || silvermoon;
                const kalimdor = azuremyst || bloodmyst || exodar;
                const newZones = easternKingdoms || kalimdor;
                return expansion === 'classic' && newZones ? false : z.title !== zone;
              })
            };
          }).filter(f => {
            const onOutland = f.title === 'Outland';
            const onNorthrend = f.title === 'Northrend';
            if (expansion === 'classic' && (onOutland || onNorthrend)) return false;
            if (expansion === 'tbc' && onNorthrend) return false;
            return true;
          })
        };
      })
    }];

    if (!zone) menu[0]['submenu'].shift();
    return menu;
  }

  const filteredClassMenu = () => {
    return [{
      title: classMenu[0]['title'],
      submenu: classMenu[0]['submenu'].filter(c => {
        const onAlliance = faction === 'alliance';
        const onHorde = faction === 'horde';
        const paladin = c.id === 2;
        const shaman = c.id === 7;
        const noAllianceMatch = onAlliance && shaman;
        const noHordeMatch = onHorde && paladin;
        if (expansion === 'classic' && (noAllianceMatch || noHordeMatch)) return false;

        const deathKnight = c.id === 6;
        if (expansion !== 'wotlk' && deathKnight) return false;

        const noClassMatch = c.id !== characterClass?.id;
        const noClassSelected = !characterClass && !c.id;
        return noClassMatch && noClassSelected ? false : noClassMatch;
      })
    }];
  }

  const filteredRaceMenu = () => {
    const raceMenuFaction = raceMenu[faction][0];
    return [{
      title: raceMenuFaction.title,
      submenu: raceMenuFaction.submenu.filter(r => {
        const nonVanillaRace = r.id === 10 || r.id === 11;
        if (expansion === 'classic' && nonVanillaRace) return false;
                
        const noRaceMatch = r.id !== race?.id;
        const noRaceSelected = !race && !r.id;
        return noRaceMatch && noRaceSelected ? false : noRaceMatch;
      })
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
      Additional Filters
      <DropdownMenu type="character" menu={filteredCharacterMenu()} />
      <DropdownMenu type="type" menu={filteredQuestTypeMenu()} />
    </div>
  );
}

export default Controls;
