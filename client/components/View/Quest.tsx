import { QuestProps } from '../../types';


const Quest = ({ quest }: QuestProps) => {
  return (
    <tr className={quest.completed ? 'complete' : 'incomplete'}>
      <td>{quest.title}</td>
      <td>{quest.entry}</td>
      <td>{quest.completed}</td>
    </tr>
  );
}

export default Quest;
