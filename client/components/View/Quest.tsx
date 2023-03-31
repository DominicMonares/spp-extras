import { useAppSelector } from '../../store/hooks';
import { QuestProps } from '../../types';
import complete from '../../assets/status/complete.png';
import incomplete from '../../assets/status/incomplete.png';


const Quest = ({ quest }: QuestProps) => {
  const expansion = useAppSelector(state => state.expansion.selected);

  return (
    <tr className={`${expansion}-quest`}>
      <td className="qt-td3">
        {quest.completed ? (
          <img className="qt-complete" src={complete} />
        ) : (
          <img className="qt-incomplete" src={incomplete} />
        )}
      </td>
      <td className="qt-td2">{quest.entry}</td>
      <td className="qt-td1">{quest.title}</td>
    </tr>
  );
}

export default Quest;
