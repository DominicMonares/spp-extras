import _ from "lodash";

// React
import { useState, useEffect } from 'react';

// Redux
import { useAppSelector } from '../../store/hooks';

// Components
import Quest from './Quest';

// Types
import { Subzone, Zones } from "../../types/general";
import { ViewQuests } from '../../types/quests';

// Data
import zoneRef from '../../../data/zoneRef.json';


const QuestTrackerView = () => {
  const completedQuests = useAppSelector(state => state.completedQuests);
  const allQuests = useAppSelector(state => state.allQuests);
  const settings = useAppSelector(state => state.questTracker);
  const [quests, setQuests] = useState<ViewQuests>({});

  const faction = settings.faction;
  const zone = settings.zone;

  useEffect(() => {
    const newQuests: ViewQuests = {};

    // Update quest template based on faction and zone
    if (faction) {
      const template = { ...allQuests[faction], ...allQuests['both'] };
      for (const q in template) {
        const quest = template[q];
        if (zone) {
          const zones = zoneRef as Zones;
          const zoneIds = zones[zone].map((s: Subzone) => s.subzoneId);
          if (zoneIds.includes(quest.zoneorsort)) {
            newQuests[q] = { ...quest, completed: false };
          }
        } else {
          newQuests[q] = { ...quest, completed: false };
        }
      }
    }

    // Mark completed quests
    for (const c in completedQuests[faction]) {
      const char = completedQuests[faction][c];
      for (const q in char['reg']) { // TEMP reg, will include weekly, daily, etc.
        const quest = char['reg'][q];
        if (newQuests[quest.quest]) newQuests[quest.quest]['completed'] = true;
      }
    }

    if (!_.isEqual(quests, newQuests)) setQuests(newQuests);
  });

  return (
    <div>
      Quests
      {Object.values(quests).map((q, i) => <Quest key={i} quest={q} />)}
    </div>
  );
}

export default QuestTrackerView;
