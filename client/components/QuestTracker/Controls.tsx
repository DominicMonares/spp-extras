import DropdownMenu from '../DropdownMenu';
import FactionCheckboxes from './FactionCheckboxes';
import QuestTypeCheckboxes from './QuestTypeCheckboxes';
import { useAppSelector } from '../../store/hooks';
import { QuestTrackerControlsProps } from '../../types';
import zoneMenu from '../../../data/zoneMenu.json';
import './QuestTracker.css';


const Controls = ({ characters }: QuestTrackerControlsProps) => {
  const settings = useAppSelector(state => state.questTracker);
  const faction = settings.faction;

  return (
    <div className="controls">
      <FactionCheckboxes />
      {faction ? (
        <>
          <QuestTypeCheckboxes />
          <DropdownMenu type="zone" menu={zoneMenu} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Controls;
