// Redux
import { useAppSelector } from '../../store/hooks';


const QuestTrackerView = () => {
  const zone = useAppSelector(state => state.questTracker.zone);
  const completedQuests = useAppSelector(state => state.completedQuests);
  const allQuests = useAppSelector(state => state.allQuests);

  return (
    <div>
      QT VIEW
      {zone}
      {allQuests.alliance ? Object.values(allQuests.alliance).map(c => <div>{c.entry}</div>) : <></>}
    </div>
  );
}

export default QuestTrackerView;
