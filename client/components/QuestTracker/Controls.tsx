import DropdownMenu from '../DropdownMenu';
import FactionCheckboxes from './FactionCheckboxes';
import QuestTypeCheckboxes from './QuestTypeCheckboxes';
import { QuestTrackerControlsProps } from '../../types';
import zoneMenu from '../../../data/zoneMenu.json';
import './QuestTracker.css';


const Controls = ({ characters }: QuestTrackerControlsProps) => {
  return (
    <div className="controls">
      <FactionCheckboxes />
      <QuestTypeCheckboxes />
      <DropdownMenu type="zone" menu={zoneMenu} />
    </div>
  );
}

export default Controls;
