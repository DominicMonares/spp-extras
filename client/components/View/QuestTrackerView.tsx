import { useAppSelector } from '../../store/hooks';
import Loading from '../Loading';
import Quest from './Quest';
import { createViewQuests } from '../../utils';
import { ViewProps } from '../../types';
import label from '../../assets/labels/long-label.png';
import './View.css';


const QuestTrackerView = ({ loading, error, retry }: ViewProps) => {
  const quests = useAppSelector(state => state.quests);
  const { completedQuests, templateQuests } = quests;
  const expansion = useAppSelector(state => state.expansion.selected);
  const settings = useAppSelector(state => state.questTracker);
  const { zone, characterClass, race } = settings;
  const smallWindow = useAppSelector(state => state.window.smallWindow);
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
        <table className="quest-table">
          <tr>
            <th>Quest Name / Wowhead Link</th>
            <th>ID</th>
            <th>Status</th>
          </tr>
          {Object.values(viewQuests).map((q, i) => <Quest key={i} quest={q} />)}
        </table>
      ) : (
        <></>
      )}
    </div>
  );
}

export default QuestTrackerView;
