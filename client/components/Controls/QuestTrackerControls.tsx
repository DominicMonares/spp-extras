import DropdownMenu from '../DropdownMenu';
import FactionSelect from './FactionSelect';
import WoWButton from '../WoWButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  characterMenu,
  classMenu,
  questTypeMenu,
  raceMenu,
  zoneMenu
} from '../../utils';
import './Controls.css';
import { storeQuestTrackerAll } from '../../store/slices';


const QuestTrackerControls = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(state => state.characters)
  const expansion = useAppSelector(state => state.expansion.selected);
  const settings = useAppSelector(state => state.questTracker);
  const { character, characterClass, faction, race, type, zone } = settings;

  return (
    <>
      <div className="qt-faction">
        <div className="control-label">{'Primary Filters'}</div>
        <FactionSelect />
      </div>
      <div className="qt-filters">
        <DropdownMenu dropdownType="zone" menu={zoneMenu(expansion, zone)} />
        <DropdownMenu
          dropdownType="class"
          menu={classMenu(expansion, faction, characterClass)}
        />
        <DropdownMenu dropdownType="race" menu={raceMenu(expansion, faction, race)} />
        <WoWButton 
          handleClick={() => dispatch(storeQuestTrackerAll({ all: true }))} 
          buttonText="All Quests" 
        />
      </div>
      <div className="qt-additional-filters">
        <div className="control-label qt-additional-label">Secondary Filters:</div>
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
