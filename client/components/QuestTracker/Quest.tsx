// Types
import { TemplateQuest } from '../../types/quests';


interface Props {
  quest: TemplateQuest
}

const Quest = ({ quest }: Props) => {
  return (
    <div>
      <span>{quest.title}</span>
    </div>
  );
}

export default Quest;