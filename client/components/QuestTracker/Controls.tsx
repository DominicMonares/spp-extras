import { useAppSelector } from '../../store/hooks';
import DropdownMenu from '../DropdownMenu';
import FactionCheckboxes from './FactionCheckboxes';
import QuestTypeCheckboxes from './QuestTypeCheckboxes';
import { QuestTrackerControlsProps } from '../../types';
import classMenu from '../../../data/classMenu.json';
import raceMenu from '../../../data/raceMenu.json';
import zoneMenu from '../../../data/zoneMenu.json';
import './QuestTracker.css';


const Controls = ({ characters }: QuestTrackerControlsProps) => {
  const faction = useAppSelector(state => state.questTracker.faction);

  const characterMenu = () => {
    return [
      {
        title: 'Character',
        submenu: Object.values(characters[faction]).map(c => {
          return { title: c.name, id: c.guid };
        })
      }
    ];
  }

  return (
    <div className="controls">
      <FactionCheckboxes />
      <QuestTypeCheckboxes />
      <DropdownMenu type="zone" menu={zoneMenu} />
      Other Settings
      <DropdownMenu type="class" menu={classMenu} />
      <DropdownMenu type="race" menu={raceMenu[faction]} />
      <DropdownMenu type="character" menu={characterMenu()} />
    </div>
  );
}

export default Controls;
