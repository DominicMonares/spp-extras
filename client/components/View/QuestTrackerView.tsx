import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import Loading from '../Loading';
import Quest from './Quest';
import { createViewQuests, reverseSortViewQuests, sortViewQuests } from '../../utils';
import { SortSetting, ViewProps } from '../../types';
import label from '../../assets/labels/long-label.png';
import './View.css';


const QuestTrackerView = ({ loading, error, retry }: ViewProps) => {
  const quests = useAppSelector(state => state.quests);
  const { completedQuests, templateQuests } = quests;
  const expansion = useAppSelector(state => state.expansion.selected);
  const settings = useAppSelector(state => state.questTracker);
  const { zone, characterClass, race } = settings;
  const [sort, setSort] = useState<SortSetting>('');
  const [sortNameReverse, setSortNameReverse] = useState<boolean>(true);
  const [sortIDReverse, setSortIDReverse] = useState<boolean>(true);
  const [sortStatusReverse, setStatusReverse] = useState<boolean>(true);
  const viewQuests = createViewQuests(completedQuests, settings, templateQuests);

  const setSortedQuests = (sortSetting: SortSetting) => {
    setSort(sortSetting);
    if (sortSetting === 'name') {
      setSortNameReverse(!sortNameReverse);
      setSortIDReverse(true);
      setStatusReverse(true);
    } else if (sortSetting === 'id') {
      setSortNameReverse(true);
      setSortIDReverse(!sortIDReverse);
      setStatusReverse(true);
    } else if (sortSetting === 'status') {
      setSortNameReverse(true);
      setSortIDReverse(true);
      setStatusReverse(!sortStatusReverse);
    }
  }

  const sortedViewQuests = () => {
    if (sort === 'name') {
      if (sortNameReverse) {
        return reverseSortViewQuests(viewQuests, sort);
      } else {
        return sortViewQuests(viewQuests, sort);
      }
    } else if (sort === 'id') {
      if (sortIDReverse) {
        return reverseSortViewQuests(viewQuests, sort);
      } else {
        return sortViewQuests(viewQuests, sort);
      }
    } else if (sort === 'status') {
      if (sortStatusReverse) {
        return reverseSortViewQuests(viewQuests, sort);
      } else {
        return sortViewQuests(viewQuests, sort);
      }
    } else {
      return viewQuests;
    }
  }

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
              <th className="qt-th1" onClick={() => setSortedQuests('name')}>Quest Name</th>
              <th className="qt-th2" onClick={() => setSortedQuests('id')}>ID</th>
              <th className="qt-th3" onClick={() => setSortedQuests('status')}>Status</th>
            </tr>
          </thead>
          <tbody className={`${expansion}-tbody`}>
            {sortedViewQuests().map((q, i) => <Quest key={i} quest={q} />)}
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </div>
  );
}

export default QuestTrackerView;
