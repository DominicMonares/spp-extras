import DropdownMenu from '../DropdownMenu';
import FactionSelect from './FactionSelect';
import MainButton from '../MainButton';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import { storeQuestTrackerAll } from 'renderer/store/slices';
import {
  createCharacterMenu,
  createClassMenu,
  createQuestTypeMenu,
  createRaceMenu,
  createZoneMenu
} from 'utils';
import { Faction } from 'types';
import './Controls.css';

const QuestTrackerControls = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(state => state.characters);
  const expansion = useAppSelector(state => state.expansion.selected);
  const faction = useAppSelector(state => state.faction.selected as Faction);
  const settings = useAppSelector(state => state.questTracker);
  const { character, characterClass, race, type, zone } = settings;

  return (
    <div className="qt-controls">
      <div className="ctrl-label primary-ctrl-label">Primary Filters</div>
      <FactionSelect />
      <div className="qt-filter-list">
        <DropdownMenu dropdownType="zone" menu={createZoneMenu(expansion, zone)} />
        <DropdownMenu
          dropdownType="class"
          menu={createClassMenu(expansion, faction, characterClass.id || 0)}
        />
        <DropdownMenu dropdownType="race" menu={createRaceMenu(expansion, faction, race.id || 0)} />
      </div>
      <MainButton
        handleClick={() => dispatch(storeQuestTrackerAll(true))}
        buttonText="All Quests"
      />
      <div className="ctrl-label qt-additional-label">Secondary Filters:</div>
      <div className="qt-sec-filter-list">
        <DropdownMenu
          dropdownType="character"
          menu={createCharacterMenu(character.id || 0, characters, faction)}
        />
        <DropdownMenu dropdownType="type" menu={createQuestTypeMenu(expansion, type)} />
      </div>
    </div>
  );
}

export default QuestTrackerControls;
