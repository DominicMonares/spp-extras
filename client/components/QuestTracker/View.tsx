// Redux
import { useAppSelector } from '../../store/hooks';


const QuestTrackerView = () => {
  // const completedQuests = useAppSelector(state => state.completedQuests);
  const allQuests = useAppSelector(state => state.allQuests);
  const settings = useAppSelector(state => state.questTracker);
  const faction = settings.faction;
  const zone = settings.zone;

  // useEffect to fetch and sort by faction, zone, char, etc.

  return (
    <div>
      QT VIEW
      {allQuests.alliance ? Object.values(allQuests.alliance).map(c => <div>{c.entry}</div>) : <></>}
    </div>
  );
}

export default QuestTrackerView;
