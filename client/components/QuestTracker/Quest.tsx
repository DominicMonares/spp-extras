import { QuestProps } from '../../types';


const Quest = ({ quest }: QuestProps) => {
  return (
    <div>
      <span className={quest.completed ? 'complete' : 'incomplete'}>
        {quest.title}
      </span>
    </div>
  );
}

export default Quest;
