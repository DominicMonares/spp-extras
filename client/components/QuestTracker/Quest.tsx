// Types
import { AllQuestTemplate } from '../../types/quests';


interface Props {
  quest: AllQuestTemplate
}

const Quest = ({ quest }: Props) => {
  return (
    <div>
      <span>{quest.title}</span>
    </div>
  );
}

export default Quest;