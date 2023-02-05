import Quest from './Quest';
import { useAppSelector } from '../../store/hooks';
import {
  QuestConditions,
  QuestFlags,
  QuestTrackerViewProps,
  Subzone,
  ViewQuests,
  Zones
} from '../../types';
import repeatQuestFlags from '../../../data/repeatQuestFlags.json';
import zoneRef from '../../../data/zoneRef.json';


const zones = zoneRef as Zones;
const questFlags = repeatQuestFlags as QuestFlags;

const View = ({ templateQuests, completedQuests }: QuestTrackerViewProps) => {
  const settings = useAppSelector(state => state.questTracker);
  const { faction, type, zone, characterClass, race, character } = settings;

  const filteredQuests = () => {
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
          characterClass: {
            setting: characterClass,
            conditionMet: () => {
              // don't render faction specific classes for classic
              // filter classes if race selected
              // console.log('CHAR CLASS SET ', characterClass)
              return false; // TEMP
            }
          },
          race: {
            setting: race,
            conditionMet: () => {
              // filter races if class selected
              // filter races by faction
              // console.log('RACE SET ', race);
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
    if (character && character.id) {
      const characterQuests = completedQuests[faction][character.id];
      for (const q in characterQuests[type]) {
        const quest = characterQuests[type][q];
        if (newQuests[quest.quest]) newQuests[quest.quest]['completed'] = true;
      }
    } else {
      const allCompletedQuests = { ...completedQuests['alliance'], ...completedQuests['horde'] };
      for (const c in allCompletedQuests) {
        const char = allCompletedQuests[c];
        for (const q in char[type]) {
          const quest = char[type][q];
          if (newQuests[quest.quest]) newQuests[quest.quest]['completed'] = true;
        }
      }
    }

    return newQuests;
  };

  return (
    <div>
      Quests
      <div>WOWHEAD TEST</div>
      {Object.values(filteredQuests()).map((q, i) => <Quest key={i} quest={q} />)}
    </div>
  );
}

export default View;
