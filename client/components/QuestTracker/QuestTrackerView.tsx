import React from 'react';

import { useAppSelector } from '../../store/hooks';

const QuestTrackerView = () => {
  const characters = useAppSelector(state => state.characters);
  const completedQuests = useAppSelector(state => state.completedQuests);

  console.log('ASDF ', completedQuests)

  return (
    <div>
      QT VIEW
      {completedQuests.alliance ? Object.values(completedQuests.alliance).map(c => Object.values(c.reg).map(q => {
        return <div>{q.guid}</div>
      })) : <></>}
    </div>
  );
}

export default QuestTrackerView;
