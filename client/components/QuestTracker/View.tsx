import Quest from './Quest';
import { useAppSelector } from '../../store/hooks';
import {
  CharacterQuests,
  Faction,
  QuestConditions,
  QuestFlags,
  QuestRaces,
  QuestTrackerViewProps,
  SubzoneData,
  ViewQuests,
  ZonesData
} from '../../types';
import _questRaces from '../../../data/questRaces.json';
import repeatQuestFlags from '../../../data/repeatQuestFlags.json';
import zoneRef from '../../../data/zoneRef.json';


const questFlags = repeatQuestFlags as QuestFlags;
const questRaces = _questRaces as QuestRaces;
const zones = zoneRef as ZonesData;

const View = ({ templateQuests, completedQuests }: QuestTrackerViewProps) => {
  const settings = useAppSelector(state => state.questTracker);
  const { faction, type, zone, characterClass, race, character } = settings;

  const filteredQuests = () => {
    const quests: ViewQuests = {};

    // Render quests once faction selected, filter by settings
    if (faction) {
      // Add template quests that meet conditions to render object
      const template = { ...templateQuests[faction], ...templateQuests['both'] };
      for (const q in template) {
        const quest = template[q];
        const questClass = quest.requiredclasses;
        const questRace = quest.requiredraces;
        const questFaction = questRaces[questRace]['faction'] as Faction | 'both';
        const factionMatch = questFaction === faction || questFaction === 'both';

        const conditions: QuestConditions = {
          type: {
            setting: type,
            conditionMet: () => {
              if (type === 'regular' || type === 'daily' || type === 'weekly') {
                return questFlags[type].includes(quest.questflags);
              } else if (type === 'monthly') {
                // Only 4 monthly quests prior to patch 4.3
                const entry = quest.entry;
                if (entry >= 9884 && entry <= 9887) return true;
              } else {
                return true;
              }
            }
          },
          zone: {
            setting: zone,
            conditionMet: () => {
              const zoneIds = zone ? zones[zone].map((s: SubzoneData) => s.subzoneId) : false;
              return zoneIds ? zoneIds.includes(quest.zoneorsort) : false;
            }
          },
          characterClass: {
            setting: characterClass,
            conditionMet: () => {
              let completeMatch = true;
              const classesMatch = characterClass?.value === questClass;
              const racesMatch = questRaces[questRace]['raceIds'].includes(race?.id);
              if (!classesMatch) completeMatch = false;
              if (race && !racesMatch) completeMatch = false;
              if (!race && !factionMatch) completeMatch = false;
              return completeMatch;
            }
          },
          race: {
            setting: race,
            conditionMet: () => {
              if (!characterClass && !quest.requiredclasses && race) {
                return questRaces[questRace]['raceIds'][0] === race?.id;
              } else if (characterClass && race) {
                return questRaces[questRace]['raceIds'].includes(race?.id);
              }
            }
          }
        };

        let conditionsMet = true;
        for (const c in conditions) {
          const conditionSetting = conditions[c]['setting'];
          const conditionMet = conditions[c]['conditionMet']();
          if (conditionSetting && !conditionMet) conditionsMet = false;
        }

        if (conditionsMet) quests[q] = { ...quest, completed: false };
      }
    }

    const allTypeQuests = (characterQuests: CharacterQuests) => {
      const allCharacterQuests = {
        ...characterQuests.regular,
        ...characterQuests.daily,
        ...characterQuests.weekly,
        ...characterQuests.monthly
      }

      const typeQuests = type ? characterQuests[type] : allCharacterQuests;
      for (const q in typeQuests) {
        const quest = typeQuests[q];
        if (quests[quest.quest]) quests[quest.quest]['completed'] = true;
      }
    }

    // Mark completed quests, check both factions so neutral quests are marked
    if (character && character.id) {
      const characterQuests = completedQuests[faction][character.id];
      allTypeQuests(characterQuests);
    } else {
      const allCompletedQuests = { ...completedQuests['alliance'], ...completedQuests['horde'] };
      for (const c in allCompletedQuests) allTypeQuests(allCompletedQuests[c]);
    }

    return quests;
  };

  return (
    <div>
      {characterClass || race || zone ? (
        Object.values(filteredQuests()).map((q, i) => <Quest key={i} quest={q} />)
      ) : (
        <span>Please Select a Zone OR Class and/or Race</span>
      )}
    </div>
  );
}

export default View;
