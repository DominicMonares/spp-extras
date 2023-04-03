import { useAppSelector } from '../../store/hooks';
import complete from '../../assets/status/complete.png';
import incomplete from '../../assets/status/incomplete.png';
import { QuestProps } from '../../types';


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
      <td className="qt-td1">{quest.title}&lrm;</td>
    </tr>
  );
}

export default Quest;
