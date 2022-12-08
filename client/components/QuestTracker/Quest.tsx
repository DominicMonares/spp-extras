// Types
import { ViewQuest } from '../../types/quests';


interface Props {
  quest: ViewQuest
}

const Quest = ({ quest }: Props) => {
  return (
    <div>
      <span className={quest.completed ? 'complete' : 'incomplete'}>
        {quest.title}
      </span>
    </div>
  );
}

export default Quest;
