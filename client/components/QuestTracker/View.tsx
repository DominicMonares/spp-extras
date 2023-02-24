import Quest from './Quest';
import { useAppSelector } from '../../store/hooks';
import { createViewQuests } from '../../utils';
import { QuestTrackerViewProps } from '../../types';


const View = ({ templateQuests, completedQuests, error, retry }: QuestTrackerViewProps) => {
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
      {error ? (
        <div>
          <div>ERROR: {JSON.stringify(error)}</div>
          <div>Please ensure the database is still running.</div>
          <div onClick={retry}>Retry connection</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default View;
