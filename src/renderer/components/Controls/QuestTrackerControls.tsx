import DropdownMenu from '../DropdownMenu';
import FactionSelect from './FactionSelect';
import MainButton from '../MainButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { storeQuestTrackerAll } from '../../store/slices';
import {
  createCharacterMenu,
  createClassMenu,
  createQuestTypeMenu,
  createRaceMenu,
  createZoneMenu
} from '../../utils';
import './Controls.css';
import { Faction } from 'types';


const QuestTrackerControls = () => {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector(state => state.accounts.all);
  const account = accounts[0];
  const characters = account?.characters || { alliance: {}, horde: {} };
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
          menu={createClassMenu(expansion, faction, characterClass.id)}
        />
        <DropdownMenu dropdownType="race" menu={createRaceMenu(expansion, faction, race.id)} />
      </div>
      <MainButton
        handleClick={() => dispatch(storeQuestTrackerAll(true))}
        buttonText="All Quests"
      />
      <div className="ctrl-label qt-additional-label">Secondary Filters:</div>
      <div className="qt-sec-filter-list">
        <DropdownMenu
          dropdownType="character"
          menu={createCharacterMenu(character.id, characters, faction)}
        />
        <DropdownMenu dropdownType="type" menu={createQuestTypeMenu(expansion, type)} />
      </div>
    </div>
  );
}

export default QuestTrackerControls;
