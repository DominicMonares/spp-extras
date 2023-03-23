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
  const viewQuests = createViewQuests(completedQuests, settings, templateQuests);

  return (
    <div>
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
      {!loading && !error && !characterClass && !race && !zone ? (
        <div className="qt-select-header">
          <img src={label} />
          <div className="qt-select-text">
            Please select a zone ~or~ class and/or race
          </div>
        </div>
      ) : (
        <></>
      )}
      {characterClass || race || zone ? (
        <table className={`qt-table ${expansion}-qt-table`}>
          <thead>
            <tr>
              <th className="qt-th1">Quest Name</th>
              <th className="qt-th2">ID</th>
              <th className="qt-th3">Status</th>
            </tr>
          </thead>
          <tbody className={`${expansion}-tbody`}>
            {Object.values(viewQuests).map((q, i) => <Quest key={i} quest={q} />)}
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </div>
  );
}

export default QuestTrackerView;
