import Quest from './Quest';
import { useAppSelector } from '../../store/hooks';
import {
  QuestConditions,
  QuestFlags,
  QuestRaces,
  QuestTrackerViewProps,
  Subzone,
  ViewQuests,
  Zones
} from '../../types';
import _questRaces from '../../../data/questRaces.json';
import repeatQuestFlags from '../../../data/repeatQuestFlags.json';
import zoneRef from '../../../data/zoneRef.json';


const questFlags = repeatQuestFlags as QuestFlags;
const questRaces = _questRaces as QuestRaces;
const zones = zoneRef as Zones;

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
        const questClass = quest.requiredclasses;
        const questRace = quest.requiredraces;
        const factionMatch = faction === questRaces[questRace]['faction'];

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
              let completeMatch = true;
              const classesMatch = characterClass?.value === questClass;
              const racesMatch = questRaces[questRace]['raceIds'].includes(race?.value);
              if (!classesMatch) completeMatch = false;
              if (race && !racesMatch) completeMatch = false;
              if (!race && !factionMatch) completeMatch = false;
              return completeMatch;
            }
          },
          race: {
            setting: race,
            conditionMet: () => questRaces[questRace]['raceIds'].includes(race?.value)
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
