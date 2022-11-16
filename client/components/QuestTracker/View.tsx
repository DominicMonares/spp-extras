import _ from "lodash";

// React
import { useState, useEffect } from 'react';

// Redux
import { useAppSelector } from '../../store/hooks';

// Components
import Quest from './Quest';

// Types
import { Subzone, Zones } from "../../types/general";
import { QuestConditions, QuestFlags, ViewQuests } from '../../types/quests';

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
  const charClass = settings.charClass;

  useEffect(() => {
    const newQuests: ViewQuests = {};

    // Update quest template based on faction, type, and zone
    if (faction) {
      const template = { ...allQuests[faction], ...allQuests['both'] };
      for (const q in template) {
        const quest = template[q];
        const conditions: QuestConditions = {
          type: {
            setting: type,
            met: () => {
              return type ? questFlags[type].includes(quest.questflags) : false;
            }
          },
          zone: {
            setting: zone,
            met: () => {
              const zoneIds = zone ? zones[zone].map((s: Subzone) => s.subzoneId) : false;
              return zoneIds ? zoneIds.includes(quest.zoneorsort) : false;
            }
          },
          class: {
            setting: className,
            met: () => {
              console.log('TEST')
            }
          }
        };

        let met = true;
        for (const c in conditions) {
          const conditionSetting = conditions[c]['setting'];
          const conditionMet = conditions[c]['met']();
          if (conditionSetting && !conditionMet) met = false;
        }

        if (met) newQuests[q] = { ...quest, completed: false };
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
