import { useAppSelector } from '../../store/hooks';
import { QuestProps } from '../../types';
import complete from '../../assets/labels/complete.png';
import incomplete from '../../assets/labels/incomplete.png';


const Quest = ({ quest }: QuestProps) => {
  return (
    <tr>
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
