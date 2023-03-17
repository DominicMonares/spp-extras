import { useAppSelector } from '../../store/hooks';
import Loading from '../Loading';
import Quest from './Quest';
import { createViewQuests } from '../../utils';
import { QuestTrackerViewProps } from '../../types';
import label from '../../assets/labels/long-label.png';


const View = ({
  templateQuests, completedQuests, loading, error, retry
}: QuestTrackerViewProps) => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const settings = useAppSelector(state => state.questTracker);
  const { zone, characterClass, race } = settings;
  const viewQuests = createViewQuests(completedQuests, settings, templateQuests);

  return (
    <div className={`${expansion}-qt-view`}>
      {loading ? <Loading /> : <></>}
      {error ? (
        <div>
          <div>ERROR: {JSON.stringify(error)}</div>
          <div>Please ensure the database is still running.</div>
          <div onClick={retry}>Retry connection</div>
        </div>
      ) : (
        <></>
      )}
      {(!loading && !error) && (!characterClass || !race || !zone) ? (
        <div className="qt-select-label">
          <img src={label} />
          <div className="qt-select-text">
            Please select a zone ~or~ class and/or race
          </div>
        </div>
      ) : (
        <></>
      )}
      {characterClass || race || zone ? (
        Object.values(viewQuests).map((q, i) => <Quest key={i} quest={q} />)
      ) : (
        <></>
      )}
    </div>
  );
}

export default View;
