import { useState } from 'react';
import MainBigHeader from '../MainBigHeader';
import Quest from './Quest';
import { useAppSelector } from '../../store/hooks';
import { createViewQuests, reverseSortViewQuests, sortViewQuests } from '../../utils';
import { SortSetting } from '../../types';
import './View.css';


const QuestTrackerView = () => {
  const quests = useAppSelector(state => state.quests);
  const { completedQuests, templateQuests } = quests;
  const expansion = useAppSelector(state => state.expansion.selected);
  const faction = useAppSelector(state => state.faction.selected);
  const settings = useAppSelector(state => state.questTracker);
  const { all, characterClass, race, zone } = settings;
  const [sort, setSort] = useState<SortSetting>('');
  const [sortNameReverse, setSortNameReverse] = useState<boolean>(true);
  const [sortIDReverse, setSortIDReverse] = useState<boolean>(true);
  const [sortStatusReverse, setStatusReverse] = useState<boolean>(true);
  
  const fullSettings = { ...settings, faction: faction };
  const viewQuests = createViewQuests(all, completedQuests, fullSettings, templateQuests);

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
      {all || characterClass || race || zone ? (
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
        <MainBigHeader headerText="Please select a zone ~or~ race and/or class" />
      )}
    </div>
  );
}

export default QuestTrackerView;
