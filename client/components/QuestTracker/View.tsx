import _ from "lodash";

// React
import { useState, useEffect } from 'react';

// Redux
import { useAppSelector } from '../../store/hooks';

// Components
import Quest from './Quest';

// Types
import { Subzone, Zones } from "../../types/general";
import { QuestFlags, ViewQuests } from '../../types/quests';

// Data
import zoneRef from '../../../data/zoneRef.json';
const zones = zoneRef as Zones;
import repeatQuestFlags from '../../../data/repeatQuestFlags.json';
const questFlags = repeatQuestFlags as QuestFlags; 


const QuestTrackerView = () => {
  const completedQuests = useAppSelector(state => state.completedQuests);
  const allQuests = useAppSelector(state => state.allQuests);
  const settings = useAppSelector(state => state.questTracker);
  const [quests, setQuests] = useState<ViewQuests>({});

  const faction = settings.faction;
  const type = settings.type;
  const zone = settings.zone;

  useEffect(() => {
    const newQuests: ViewQuests = {};

    // Update quest template based on faction, type, and zone
    if (faction) {
      const template = { ...allQuests[faction], ...allQuests['both'] };
      for (const q in template) {
        const conditions = {
          zone: {
            setting: faction,
            met: () => {

            }
          }
        };

        const quest = template[q];
        const typeMatch = type ? questFlags[type].includes(quest.questflags) : null;
        const zoneIds = zone ? zones[zone].map((s: Subzone) => s.subzoneId) : null;
        const zoneMatch = zoneIds ? zoneIds.includes(quest.zoneorsort) : null;

        // if ((type && typeMatch) && (zone && zoneMatch)) {

        // }

        newQuests[q] = { ...quest, completed: false };
      }
    }

    // USE CHARACTER SETTING HERE
    // Mark completed quests
    for (const c in completedQuests[faction]) {
      const char = completedQuests[faction][c];
      for (const q in char[type]) {
        const quest = char[type][q];
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
