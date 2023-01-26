import _ from "lodash";
import { useEffect, useState } from 'react';
import Quest from './Quest';
import { useAppSelector } from '../../store/hooks';
import {
  QuestConditions,
  QuestFlags,
  Subzone,
  ViewQuests,
  Zones
} from '../../types';
import repeatQuestFlags from '../../../data/repeatQuestFlags.json';
import zoneRef from '../../../data/zoneRef.json';


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

    // Mark completed quests, check both factions so neutral quests are marked
    const allCompletedQuests = { ...completedQuests['alliance'], ...completedQuests['horde'] };
    for (const c in allCompletedQuests) {
      const character = allCompletedQuests[c];
      for (const q in character[type]) {
        const quest = character[type][q];
        if (newQuests[quest.quest]) newQuests[quest.quest]['completed'] = true;
      }
    }

    if (!_.isEqual(quests, newQuests)) {
      // clear zone if class setting used
      setQuests(newQuests);
    }
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
