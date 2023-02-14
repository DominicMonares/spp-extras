import Quest from './Quest';
import { useAppSelector } from '../../store/hooks';
import { filterTemplateQuests, markTemplateQuests } from '../../utils';
import { QuestTrackerViewProps } from '../../types';


const View = ({ templateQuests, completedQuests }: QuestTrackerViewProps) => {
  const settings = useAppSelector(state => state.questTracker);
  const { faction, type, zone, characterClass, race, character } = settings;

  const viewQuests = () => {
    const filteredTemplateQuests = filterTemplateQuests(settings, templateQuests);

    // Mark completed quests, check both factions so neutral quests are marked
    if (character && character.id) {
      const characterQuests = completedQuests[faction][character.id];
      markTemplateQuests(characterQuests, filteredTemplateQuests, type);
    } else {
      const allCompletedQuests = { 
        ...completedQuests['alliance'], 
        ...completedQuests['horde'] 
      };
      
      for (const c in allCompletedQuests) {
        markTemplateQuests(allCompletedQuests[c], filteredTemplateQuests, type);
      }
    }

    return filteredTemplateQuests;
  };

  return (
    <div>
      {characterClass || race || zone ? (
        Object.values(viewQuests()).map((q, i) => <Quest key={i} quest={q} />)
      ) : (
        <span>Please Select a Zone OR Class and/or Race</span>
      )}
    </div>
  );
}

export default View;
