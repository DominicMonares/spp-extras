// Redux
import { useAppSelector } from '../../store/hooks';


const QuestTrackerView = () => {
  // const characters = useAppSelector(state => state.characters);
  const completedQuests = useAppSelector(state => state.completedQuests);
  const allQuests = useAppSelector(state => state.allQuests);

  console.log('ASDF ', completedQuests)

  return (
    <div>
      QT VIEW
      {allQuests.alliance ? Object.values(allQuests.alliance).map(c => <div>{c.entry}</div>) : <></>}
    </div>
  );
}

export default QuestTrackerView;
