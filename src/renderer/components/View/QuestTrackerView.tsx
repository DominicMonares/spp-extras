import { useState } from 'react';
import MainBigHeader from '../MainBigHeader';
import Quest from './Quest';
import { useAppSelector } from '../../store/hooks';
import {
  createViewQuests,
  reverseSortViewQuests,
  sortViewQuests
} from '../../../utils';
import { SortSetting } from '../../../types';
import './View.css';
import { formatComplFactionQuests } from '../../../utils';


const QuestTrackerView = () => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const faction = useAppSelector(state => state.faction.selected);

  // Separate completed player quests from bot quests
  const characters = useAppSelector(state => state.characters);
  // const account = accounts[0]
  const quests = useAppSelector(state => state.quests);
  const { completedQuests, templateQuests } = quests;
  const playerQuests = formatComplFactionQuests(characters, completedQuests);

  // Determine how to filter view quests
  const settings = useAppSelector(state => state.questTracker);
  const { all, characterClass, race, zone } = settings as any; // TEMP ANY

  // Track which column is currently being sorted
  const [sort, setSort] = useState<SortSetting>('');

  // Track different sort types - allow ascending and descending sort
  const [sortNameReverse, setSortNameReverse] = useState<boolean>(true);
  const [sortIDReverse, setSortIDReverse] = useState<boolean>(true);
  const [sortStatusReverse, setStatusReverse] = useState<boolean>(true);

  // Add faction to settings and create view quests
  const fullSettings = { ...settings, faction: faction };
  const viewQuests = createViewQuests(all, playerQuests, fullSettings, templateQuests);

  // Ensure only one sort filter is active at a time
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

  // Create sorted view quests
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
      // Change nothing if no setting provided
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
        <MainBigHeader headerText="Please select your filters" />
      )}
    </div>
  );
}

export default QuestTrackerView;
