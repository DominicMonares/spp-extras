import { QuestProps } from '../../types';


const Quest = ({ quest }: QuestProps) => {
  return (
    <div>
      <span className={quest.completed ? 'complete' : 'incomplete'}>
        {`
          ${quest.title} |
          Quest: ${quest.entry} |
          Race: ${quest.requiredraces} |
          Class: ${quest.requiredclasses}
        `}
      </span>
    </div>
  );
}

export default Quest;
