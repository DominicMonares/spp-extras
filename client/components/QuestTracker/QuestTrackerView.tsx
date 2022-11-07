import React from 'react';

import { useAppSelector } from '../../store/hooks';

const QuestTrackerView = () => {
  const characters = useAppSelector(state => state.characters);
  return (
    <div>
      QT VIEW
      {Object.values(characters.alliance).map(c => c.name)}
    </div>
  );
}

export default QuestTrackerView;
