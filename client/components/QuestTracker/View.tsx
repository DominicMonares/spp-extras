import _ from "lodash";

// React
import { useState, useEffect } from 'react';

// Redux
import { useAppSelector } from '../../store/hooks';

// Components
import Quest from './Quest';

// Types
import { ViewQuests } from '../../types/quests';


const QuestTrackerView = () => {
  const completedQuests = useAppSelector(state => state.completedQuests);
  const allQuests = useAppSelector(state => state.allQuests);
  const settings = useAppSelector(state => state.questTracker);
  const [quests, setQuests] = useState<ViewQuests>({});

  const faction = settings.faction;
  const zone = settings.zone;

  // useEffect to fetch and sort by faction, zone, char, etc.
  useEffect(() => {
    const newQuests: ViewQuests = {};
    if (faction) {
      for (const q in allQuests[faction]) newQuests[q] = allQuests[faction][q];
      for (const q in allQuests['both']) newQuests[q] = allQuests['both'][q];

      // ensure class quests and 
      if (zone) {
        // modify existing faction quests to sort by zone
      }
    }
    
    if (!_.isEqual(quests, newQuests)) setQuests(newQuests);
  });

  return (
    <div>
      QT VIEW
      {Object.values(quests).map((q, i) => <Quest key={i} quest={q} />)}
    </div>
  );
}

export default QuestTrackerView;
