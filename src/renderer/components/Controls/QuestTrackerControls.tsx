import DropdownMenu from '../DropdownMenu';
import FactionSelect from './FactionSelect';
import MainButton from '../MainButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { storeQuestTrackerAll } from '../../store/slices';
import {
  characterMenu,
  classMenu,
  questTypeMenu,
  raceMenu,
  zoneMenu
} from '../../utils';
import './Controls.css';


const QuestTrackerControls = () => {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector(state => state.accounts.all);
  const account = accounts[0]
  const characters = account?.characters || { alliance: {}, horde: {} }
  const expansion = useAppSelector(state => state.expansion.selected);
  const faction = useAppSelector(state => state.faction.selected);
  const settings = useAppSelector(state => state.questTracker);
  const { character, characterClass, race, type, zone } = settings;

  return (
    <div className="qt-controls">
      <div className="ctrl-label primary-ctrl-label">Primary Filters</div>
      <FactionSelect />
      <div className="qt-filter-list">
        <DropdownMenu dropdownType="zone" menu={zoneMenu(expansion, zone)} />
        <DropdownMenu
          dropdownType="class"
          menu={classMenu(expansion, faction, characterClass)}
        />
        <DropdownMenu dropdownType="race" menu={raceMenu(expansion, faction, race)} />
      </div>
      <MainButton
        handleClick={() => dispatch(storeQuestTrackerAll({ all: true }))}
        buttonText="All Quests"
      />
      <div className="ctrl-label qt-additional-label">Secondary Filters:</div>
      <div className="qt-sec-filter-list">
        <DropdownMenu
          dropdownType="character"
          menu={characterMenu(character, characters, faction)}
        />
        <DropdownMenu dropdownType="type" menu={questTypeMenu(expansion, type)} />
      </div>
    </div>
  );
}

export default QuestTrackerControls;