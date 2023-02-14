import Quest from './Quest';
import { useAppSelector } from '../../store/hooks';
import { createViewQuests } from '../../utils';
import { QuestTrackerViewProps } from '../../types';


const View = ({ templateQuests, completedQuests }: QuestTrackerViewProps) => {
  const settings = useAppSelector(state => state.questTracker);
  const { zone, characterClass, race } = settings;
  const viewQuests = createViewQuests(completedQuests, settings, templateQuests);

  return (
    <div>
      {characterClass || race || zone ? (
        Object.values(viewQuests).map((q, i) => <Quest key={i} quest={q} />)
      ) : (
        <span>Please Select a Zone OR Class and/or Race</span>
      )}
    </div>
  );
}

export default View;
