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
import repeatQuestFlags from '../../../data/repeatQuestFlags.json';


const zones = zoneRef as Zones;
const questFlags = repeatQuestFlags as QuestFlags;

const QuestTrackerView = () => {
  const templateQuests = useAppSelector(state => state.templateQuests);
  const completedQuests = useAppSelector(state => state.completedQuests);
  const settings = useAppSelector(state => state.questTracker);
  const { faction, type, zone, charClass, race, character } = settings;
  const [quests, setQuests] = useState<ViewQuests>({});

  useEffect(() => {
    const newQuests: ViewQuests = {};

    // Render quests once faction selected, filter by settings
    if (faction) {
      // Add template quests that meet conditions to render object
      const template = { ...templateQuests[faction], ...templateQuests['both'] };
      for (const q in template) {
        const quest = template[q];
        const conditions: QuestConditions = {
          type: {
            setting: type,
            conditionMet: () => type ? questFlags[type].includes(quest.questflags) : false
          },
          zone: {
            setting: zone,
            conditionMet: () => {
              const zoneIds = zone ? zones[zone].map((s: Subzone) => s.subzoneId) : false;
              return zoneIds ? zoneIds.includes(quest.zoneorsort) : false;
            }
          },
          charClass: {
            setting: charClass,
            conditionMet: () => {
              // clear zone if class setting used
              // don't render faction specific classes for classic
              // filter classes if race selected
              return false; // TEMP
            }
          },
          race: {
            setting: race,
            conditionMet: () => {
              // filter races if class selected
              // filter races by faction
              return false; // TEMP
            }
          },
          character: {
            setting: character,
            conditionMet: () => {
              // filter by selected faction
              // filter by class and race if they're selected
              return false; // TEMP
            }
          }
        };

        let conditionsMet = true;
        for (const c in conditions) {
          const conditionSetting = conditions[c]['setting'];
          const conditionMet = conditions[c]['conditionMet']();
          if (conditionSetting && !conditionMet) conditionsMet = false;
        }

        if (conditionsMet) newQuests[q] = { ...quest, completed: false };
      }
    }

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
      <div>WOWHEAD TEST</div>
      {Object.values(quests).map((q, i) => <Quest key={i} quest={q} />)}
    </div>
  );
}

export default QuestTrackerView;
