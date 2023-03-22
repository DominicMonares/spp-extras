import { useAppSelector } from '../../store/hooks';
import { QuestProps } from '../../types';


const Quest = ({ quest }: QuestProps) => {
  const expansion = useAppSelector(state => state.expansion.selected);

  return (
    <tr>
      <td className={`qt-td3 ${expansion}${quest.completed ? '-qtc' : '-qti'}`}>
        {quest.completed ? 'Complete' : 'Incomplete'}
      </td>
      <td className="qt-td2">{quest.entry}</td>
      <td className="qt-td1">{quest.title}</td>
    </tr>
  );
}

export default Quest;
